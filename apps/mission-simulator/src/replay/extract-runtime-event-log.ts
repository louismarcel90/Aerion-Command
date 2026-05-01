import type { SimulationEvent } from "@aerion/contracts";
import { sortSimulationEvents } from "@aerion/event-bus";
import type { RuntimeHistory } from "../history/runtime-history.js";

export const extractRuntimeEventLog = (
  history: RuntimeHistory,
): readonly SimulationEvent[] => {
  return sortSimulationEvents(
    history.entries.flatMap((entry) => entry.events),
  );
};