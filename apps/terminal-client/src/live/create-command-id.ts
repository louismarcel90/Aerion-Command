import type { CommandId, SimulationTick } from "@aerion/contracts";

export const createLiveCommandId = (
  tick: SimulationTick,
  sequence: number,
): CommandId => {
  return `command-live-${tick}-${sequence}` as CommandId;
};