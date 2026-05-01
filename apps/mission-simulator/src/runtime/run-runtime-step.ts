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
  renderPremiumMissionScreen,
} from "@aerion/renderer-ascii";
import { performRadarScan } from "@aerion/sensor-engine";
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
import { buildRuntimeEvents } from "../events/build-runtime-events.js";

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

  const stateBeforeStep = advanceStateTick(activeStateBeforeTick);

  const playerAircraft = stateBeforeStep.aircraft.find(
    (aircraft) => aircraft.role === "PLAYER",
  );

  const stateAfterFlight =
    playerAircraft === undefined
      ? stateBeforeStep
      : replaceAircraft(
          stateBeforeStep,
          applyFlightManeuver(
            playerAircraft,
            FlightManeuverCommand.HoldCourse,
          ).aircraft,
        );

  const playerAfterFlight = stateAfterFlight.aircraft.find(
    (aircraft) => aircraft.role === "PLAYER",
  );

  const radarResult =
    playerAfterFlight === undefined
      ? { tracks: stateAfterFlight.radarTracks, reasonCodes: [] }
      : performRadarScan(
          playerAfterFlight,
          stateAfterFlight.aircraft,
          stateAfterFlight.radarTracks,
        );

  const stateAfterRadar = replaceRadarTracks(stateAfterFlight, radarResult.tracks);

  const missionResult = evaluateMissionEngine(stateAfterRadar);
  const stateAfterMission = missionResult.state;

  const assuranceReport = buildAssuranceReport(
    stateAfterMission,
    context.activeFaultCodes,
  );

  const runtimeEvents = buildRuntimeEvents({
    tick: stateAfterMission.tick,
    stateBeforeStep,
    stateAfterFlight,
    stateAfterRadar,
    stateAfterMission,
    commands: context.commands,
    injectedFaultCodes: context.injectedFaultCodes,
    assuranceReport,
  });

  const eventBus = createTypedEventBus(createInMemoryEventSink()).publishMany(
    runtimeEvents,
  );

  const events = eventBus.getSink().readAll();

  const renderState = projectRenderState(
    stateAfterMission,
    events,
    assuranceReport.degradedModePolicy,
  );

  const screen = renderPremiumMissionScreen(renderState, defaultTerminalDimensions, {
    colorEnabled: false,
    showScanline: true,
    showControls: true,
  });

  return {
    state: stateAfterMission,
    events,
    injectedFaultCodes: context.injectedFaultCodes,
    stepReport: kernelResult.stepReport,
    assuranceReport,
    screen,
  };
};