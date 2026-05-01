import type { AssuranceReport } from "@aerion/assurance";
import type { FaultCode, MissionCommand, SimulationEvent, SimulationTick } from "@aerion/contracts";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import { buildAircraftStateChangedEvents } from "./build-aircraft-events.js";
import { buildCommandReceivedEvents } from "./build-command-events.js";
import { buildRuntimeFaultInjectedEvents } from "./build-fault-events.js";
import { buildInvariantViolationEvents } from "./build-assurance-events.js";
import { buildMissionTransitionEvents } from "./build-mission-events.js";
import { buildRadarTrackEvents } from "./build-radar-events.js";

export type BuildRuntimeEventsInput = {
  readonly tick: SimulationTick;
  readonly stateBeforeStep: AuthoritativeSimulationState;
  readonly stateAfterFlight: AuthoritativeSimulationState;
  readonly stateAfterRadar: AuthoritativeSimulationState;
  readonly stateAfterMission: AuthoritativeSimulationState;
  readonly commands: readonly MissionCommand[];
  readonly injectedFaultCodes: readonly FaultCode[];
  readonly assuranceReport: AssuranceReport;
};

export const buildRuntimeEvents = (
  input: BuildRuntimeEventsInput,
): readonly SimulationEvent[] => {
  const missionId = input.stateAfterMission.missionId;

  return [
    ...buildCommandReceivedEvents(missionId, input.commands),
    ...buildRuntimeFaultInjectedEvents(missionId, input.tick, input.injectedFaultCodes),
    ...buildAircraftStateChangedEvents(
      missionId,
      input.tick,
      input.stateBeforeStep.aircraft,
      input.stateAfterFlight.aircraft,
    ),
    ...buildRadarTrackEvents(
      missionId,
      input.tick,
      input.stateBeforeStep.radarTracks,
      input.stateAfterRadar.radarTracks,
    ),
    ...buildMissionTransitionEvents(
      missionId,
      input.tick,
      input.stateBeforeStep,
      input.stateAfterMission,
    ),
    ...buildInvariantViolationEvents(missionId, input.tick, input.assuranceReport),
  ];
};