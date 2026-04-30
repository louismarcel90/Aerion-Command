import type {

  EventId,
  MissionId,
  SimulationEvent,
  SimulationTick,
  CommandId,
} from "@aerion/contracts";
import { FaultCode, MissionStatus, ReasonCode, SimulationEventType } from "@aerion/contracts";

export const asEventId = (value: string): EventId => {
  return value as EventId;
};

export const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createCommandReceivedEventFixture = (): SimulationEvent => {
  return {
    eventId: asEventId("event-command-received-1"),
    missionId: asMissionId("mission-001"),
    occurredAtTick: asSimulationTick(1),
    type: SimulationEventType.CommandReceived,
    commandId: asCommandId("command-001"),
    reasonCode: ReasonCode.CommandAccepted,
  };
};

export const createFaultInjectedEventFixture = (): SimulationEvent => {
  return {
    eventId: asEventId("event-fault-1"),
    missionId: asMissionId("mission-001"),
    occurredAtTick: asSimulationTick(2),
    type: SimulationEventType.FaultInjected,
    faultCode: FaultCode.RadarDegraded,    
    reasonCode: ReasonCode.LockDroppedSignalDegraded,
  };
};

export const createInvariantViolationEventFixture = (): SimulationEvent => {
  return {
    eventId: asEventId("event-invariant-1"),
    missionId: asMissionId("mission-001"),
    occurredAtTick: asSimulationTick(3),
    type: SimulationEventType.InvariantViolationDetected,
    invariantName: "TEST_INVARIANT",
    reasonCode: ReasonCode.ReplayDriftDetected,
  };
};

export const createMissionStatusEventFixture = (): SimulationEvent => {
  return {
    eventId: asEventId("event-mission-status-1"),
    missionId: asMissionId("mission-001"),
    occurredAtTick: asSimulationTick(1),
    type: SimulationEventType.MissionStatusChanged,
    previousStatus: MissionStatus.Planned,
    nextStatus: MissionStatus.Active,
    reasonCode: ReasonCode.MissionStarted,
  };
};