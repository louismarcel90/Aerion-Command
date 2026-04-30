import { advanceSimulationClock } from "../clock/simulation-clock.js";
import {
  collectCommandsForTick,
  removeCommandsForTick,
} from "../scheduler/simulation-scheduler.js";
import { runSimulationStep } from "./run-simulation-step.js";
import type { SimulationKernelState } from "./simulation-kernel-state.js";
import type { SimulationStepReport } from "./simulation-step-report.js";

export type AdvanceSimulationKernelResult = {
  readonly nextState: SimulationKernelState;
  readonly stepReport: SimulationStepReport;
};

export const advanceSimulationKernel = (
  state: SimulationKernelState,
): AdvanceSimulationKernelResult => {
  const currentTick = state.clock.currentTick;
  const commands = collectCommandsForTick(state.scheduler, currentTick);

  const stepReport = runSimulationStep({
    tick: currentTick,
    commands,
    randomProvider: state.randomProvider,
  });

  return {
    stepReport,
    nextState: {
      clock: advanceSimulationClock(state.clock),
      scheduler: removeCommandsForTick(state.scheduler, currentTick),
      randomProvider: stepReport.nextRandomProvider,
    },
  };
};