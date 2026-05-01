import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { MissionId, SimulationEvent, SimulationTick } from "@aerion/contracts";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import { buildRuntimeEventId } from "./runtime-event-id.js";

export const buildMissionTransitionEvents = (
  missionId: MissionId,
  tick: SimulationTick,
  before: AuthoritativeSimulationState,
  after: AuthoritativeSimulationState,
): readonly SimulationEvent[] => {
  const events: SimulationEvent[] = [];

  if (before.missionStatus !== after.missionStatus) {
    events.push({
      eventId: buildRuntimeEventId("mission-status-changed", tick, events.length),
      missionId,
      occurredAtTick: tick,
      type: SimulationEventType.MissionStatusChanged,
      previousStatus: before.missionStatus,
      nextStatus: after.missionStatus,
      reasonCode:
        after.missionStatus === "ACTIVE"
          ? ReasonCode.MissionStarted
          : ReasonCode.MissionSucceededObjectiveComplete,
    });
  }

  if (before.missionPhase !== after.missionPhase) {
    events.push({
      eventId: buildRuntimeEventId("mission-phase-changed", tick, events.length),
      missionId,
      occurredAtTick: tick,
      type: SimulationEventType.MissionPhaseChanged,
      previousPhase: before.missionPhase,
      nextPhase: after.missionPhase,
      reasonCode: ReasonCode.MissionPhaseAdvancedContact,
    });
  }

  return events;
};