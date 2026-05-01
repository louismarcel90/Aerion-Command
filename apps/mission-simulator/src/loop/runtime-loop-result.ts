import type { SimulationEvent } from "@aerion/contracts";
import type { RuntimeHistory } from "../history/runtime-history.js";
import type { RuntimeContext } from "../runtime/runtime-context.js";

export type RuntimeLoopResult = {
  readonly finalContext: RuntimeContext;
  readonly history: RuntimeHistory;
  readonly accumulatedEvents: readonly SimulationEvent[];
};