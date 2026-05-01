import type {
  CommandId,
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

export const buildRuntimeMissionStartedEvent = (
  missionId: MissionId,
  tick: SimulationTick,
): SimulationEvent => {
  return {
    eventId: buildRuntimeEventId("mission-started", tick),
    missionId,
    occurredAtTick: tick,
    type: SimulationEventType.MissionStatusChanged,
    previousStatus: MissionStatus.Planned,
    nextStatus: MissionStatus.Active,
    reasonCode: ReasonCode.MissionStarted,
  };
};

export const buildRuntimeCommandReceivedEvent = (
  missionId: MissionId,
  tick: SimulationTick,
): SimulationEvent => {
  return {
    eventId: buildRuntimeEventId("command-received", tick),
    missionId,
    occurredAtTick: tick,
    type: SimulationEventType.CommandReceived,
    commandId: buildRuntimeCommandId(tick),
    reasonCode: ReasonCode.CommandAccepted,
  };
};

const buildRuntimeEventId = (label: string, tick: SimulationTick): EventId => {
  return `event-${label}-${tick}` as EventId;
};

const buildRuntimeCommandId = (tick: SimulationTick): CommandId => {
  return `runtime-command-${tick}` as CommandId;
};