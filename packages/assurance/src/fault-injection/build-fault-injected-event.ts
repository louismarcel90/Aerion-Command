import {
  ReasonCode,
  SimulationEventType,
} from "@aerion/contracts";
import type {
  EventId,
  FaultCode,
  MissionId,
  SimulationEvent,
  SimulationTick,
} from "@aerion/contracts";

export type BuildFaultInjectedEventInput = {
  readonly eventId: EventId;
  readonly missionId: MissionId;
  readonly tick: SimulationTick;
  readonly faultCode: FaultCode;
};

export const buildFaultInjectedEvent = (
  input: BuildFaultInjectedEventInput,
): SimulationEvent => {
  return {
    eventId: input.eventId,
    missionId: input.missionId,
    occurredAtTick: input.tick,
    type: SimulationEventType.FaultInjected,
    faultCode: input.faultCode,
    reasonCode: ReasonCode.FaultInjected,
  };
};