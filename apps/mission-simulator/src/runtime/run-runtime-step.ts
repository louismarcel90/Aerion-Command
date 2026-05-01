import { buildAssuranceReport } from "@aerion/assurance";
import {
  createInMemoryEventSink,
  createTypedEventBus,
} from "@aerion/event-bus";
import {
  applyFlightManeuver,
  FlightManeuverCommand,
} from "@aerion/flight-model";
import { evaluateMissionEngine } from "@aerion/mission-engine";
import {
  defaultTerminalDimensions,
  projectRenderState,
  renderAsciiMissionScreen,
} from "@aerion/renderer-ascii";
import {
  performRadarScan,
} from "@aerion/sensor-engine";
import {
  advanceSimulationKernel,
  scheduleCommand,
} from "@aerion/simulation-kernel";
import {
  advanceStateTick,
  replaceAircraft,
  replaceRadarTracks,
  transitionMissionStatus,
} from "@aerion/state-store";
import { MissionStatus } from "@aerion/contracts";
import type { RuntimeContext } from "./runtime-context.js";
import type { RuntimeStepResult } from "./runtime-result.js";
import {
  buildRuntimeCommandReceivedEvent,
  buildRuntimeMissionStartedEvent,
} from "./build-runtime-events.js";

export const runRuntimeStep = (
  context: RuntimeContext,
): RuntimeStepResult => {
  const scheduledKernelState = {
    ...context.kernelState,
    scheduler: context.commands.reduce(
      (scheduler, command) => scheduleCommand(scheduler, command),
      context.kernelState.scheduler,
    ),
  };

  const kernelResult = advanceSimulationKernel(scheduledKernelState);

  const activeStateBeforeTick =
  context.state.missionStatus === MissionStatus.Planned
    ? transitionMissionStatus(context.state, MissionStatus.Active)
    : context.state;

  const activeState = advanceStateTick(activeStateBeforeTick);

  const playerAircraft = activeState.aircraft.find(
    (aircraft) => aircraft.role === "PLAYER",
  );

  const flightState =
    playerAircraft === undefined
      ? activeState
      : replaceAircraft(
          activeState,
          applyFlightManeuver(
            playerAircraft,
            FlightManeuverCommand.HoldCourse,
          ).aircraft,
        );

  const playerAfterFlight = flightState.aircraft.find(
    (aircraft) => aircraft.role === "PLAYER",
  );

  const radarResult =
    playerAfterFlight === undefined
      ? { tracks: flightState.radarTracks, reasonCodes: [] }
      : performRadarScan(
          playerAfterFlight,
          flightState.aircraft,
          flightState.radarTracks,
        );

  const stateAfterRadar = replaceRadarTracks(flightState, radarResult.tracks);

 const missionResult = evaluateMissionEngine(stateAfterRadar);
const stateAfterMission = missionResult.state;

  const initialEvents = [
    buildRuntimeMissionStartedEvent(
      stateAfterMission.missionId,
      stateAfterMission.tick,
    ),
    ...(context.commands.length > 0
      ? [
          buildRuntimeCommandReceivedEvent(
            stateAfterMission.missionId,
            stateAfterMission.tick,
          ),
        ]
      : []),
  ];

  const eventBus = createTypedEventBus(createInMemoryEventSink()).publishMany(
    initialEvents,
  );

  const events = eventBus.getSink().readAll();
  const assuranceReport = buildAssuranceReport(
    stateAfterMission,
    context.activeFaultCodes,
  );

  const renderState = projectRenderState(
    stateAfterMission,
    events,
    assuranceReport.degradedModePolicy,
  );

  const screen = renderAsciiMissionScreen(renderState, defaultTerminalDimensions);

  return {
    state: stateAfterMission,
    events,
    stepReport: kernelResult.stepReport,
    assuranceReport,
    screen,
  };
};