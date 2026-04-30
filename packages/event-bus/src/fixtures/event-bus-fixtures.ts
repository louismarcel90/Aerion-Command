import type {
  EventId,
  MissionId,
  SimulationEvent,
  SimulationTick,
} from "@aerion/contracts";
import { MissionStatus, ReasonCode, SimulationEventType } from "@aerion/contracts";

export const asEventId = (value: string): EventId => {
  return value as EventId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createMissionStatusChangedEventFixture = (
  eventId: EventId,
  occurredAtTick: SimulationTick,
): SimulationEvent => {
  return {
    eventId,
    missionId: asMissionId("mission-001"),
    occurredAtTick,
    type: SimulationEventType.MissionStatusChanged,
    previousStatus: MissionStatus.Planned,
    nextStatus: MissionStatus.Active,
    reasonCode: ReasonCode.MissionStarted,
  };
};