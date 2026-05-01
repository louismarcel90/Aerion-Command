import type { SimulationEvent } from "@aerion/contracts";
import type { RuntimeHistory } from "../../history/runtime-history.js";

export const extractAllEvents = (
  history: RuntimeHistory,
): readonly SimulationEvent[] => {
  return history.entries.flatMap((entry) => entry.events);
};