import type { CommandId, SimulationTick } from "@aerion/contracts";
import type { ExecutionStage } from "../execution/execution-stage.js";
import type { SeededRandomProvider } from "../random/seeded-random-provider.js";

export type SimulationStepReport = {
  readonly tick: SimulationTick;
  readonly executedStages: readonly ExecutionStage[];
  readonly acceptedCommandIds: readonly CommandId[];
  readonly randomSample: number;
  readonly nextRandomProvider: SeededRandomProvider;
};