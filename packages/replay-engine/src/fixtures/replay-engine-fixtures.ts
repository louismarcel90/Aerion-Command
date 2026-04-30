import type {
  Digest,
  EventId,
  MissionId,
  SimulationEvent,
  SimulationTick,
} from "@aerion/contracts";
import {
  MissionStatus,
  ReasonCode,
  SimulationEventType,
} from "@aerion/contracts";

export const asDigest = (value: string): Digest => {
  return value as Digest;
};

export const asEventId = (value: string): EventId => {
  return value as EventId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createReplayMissionStartedEventFixture = (
  eventId: EventId,
  tick: SimulationTick,
): SimulationEvent => {
  return {
    eventId,
    missionId: asMissionId("mission-001"),
    occurredAtTick: tick,
    type: SimulationEventType.MissionStatusChanged,
    previousStatus: MissionStatus.Planned,
    nextStatus: MissionStatus.Active,
    reasonCode: ReasonCode.MissionStarted,
  };
};

export const createReplayInvariantViolationEventFixture = (
  eventId: EventId,
  tick: SimulationTick,
): SimulationEvent => {
  return {
    eventId,
    missionId: asMissionId("mission-001"),
    occurredAtTick: tick,
    type: SimulationEventType.InvariantViolationDetected,
    invariantName: "REPLAY_TEST_INVARIANT",
    reasonCode: ReasonCode.ReplayDriftDetected,
  };
};