import type { EventId, SimulationTick } from "@aerion/contracts";

export const buildRuntimeEventId = (
  label: string,
  tick: SimulationTick,
  sequence: number,
): EventId => {
  return `event-${label}-${tick}-${sequence}` as EventId;
};