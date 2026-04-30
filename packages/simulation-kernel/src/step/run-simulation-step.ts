import { deterministicExecutionOrder } from "../execution/execution-stage.js";
import type { SimulationStepInput } from "./simulation-step-input.js";
import type { SimulationStepReport } from "./simulation-step-report.js";

export const runSimulationStep = (
  input: SimulationStepInput,
): SimulationStepReport => {
  const [randomSample, nextRandomProvider] = input.randomProvider.next();

  return {
    tick: input.tick,
    executedStages: deterministicExecutionOrder,
    acceptedCommandIds: input.commands.map((command) => command.commandId),
    randomSample,
    nextRandomProvider,
  };
};