import { buildFaultInjectedEvent } from "@aerion/assurance";
import type { FaultCode, MissionId, SimulationEvent, SimulationTick } from "@aerion/contracts";
import { buildRuntimeEventId } from "./runtime-event-id.js";

export const buildRuntimeFaultInjectedEvents = (
  missionId: MissionId,
  tick: SimulationTick,
  injectedFaultCodes: readonly FaultCode[],
): readonly SimulationEvent[] => {
  return injectedFaultCodes.map((faultCode, index) =>
    buildFaultInjectedEvent({
      eventId: buildRuntimeEventId("fault-injected", tick, index),
      missionId,
      tick,
      faultCode,
    }),
  );
};