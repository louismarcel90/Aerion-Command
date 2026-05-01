import { evaluateFaultInjection } from "@aerion/assurance";
import { createRuntimeHistory, appendRuntimeHistoryEntry } from "../history/runtime-history.js";
import type { RuntimeHistory } from "../history/runtime-history.js";
import type { RuntimeContext } from "../runtime/runtime-context.js";
import { runRuntimeStep } from "../runtime/run-runtime-step.js";
import { advanceRuntimeContext } from "./advance-runtime-context.js";
import type { RuntimeLoopOptions } from "./runtime-loop-options.js";
import type { RuntimeLoopResult } from "./runtime-loop-result.js";
import { selectCommandsForTick } from "./select-commands-for-tick.js";

export const runRuntimeLoop = (
  initialContext: RuntimeContext,
  options: RuntimeLoopOptions,
): RuntimeLoopResult => {
  const initialHistory = createRuntimeHistory();

  return runLoopRecursive(
    initialContext,
    options,
    initialHistory,
    [],
    0,
  );
};

const runLoopRecursive = (
  context: RuntimeContext,
  options: RuntimeLoopOptions,
  history: RuntimeHistory,
  accumulatedEvents: RuntimeLoopResult["accumulatedEvents"],
  currentIteration: number,
): RuntimeLoopResult => {
  if (currentIteration >= options.ticksToRun) {
    return {
      finalContext: context,
      history,
      accumulatedEvents,
    };
  }

  const tick = context.state.tick;
  const commandsForTick = selectCommandsForTick(options.scheduledCommands, tick);

  const faultResult =
    options.faultScenario === null
      ? {
          activeFaultCodes: context.activeFaultCodes,
          injectedFaultCodes: [],
        }
      : evaluateFaultInjection(options.faultScenario, tick);

  const stepContext = {
    ...context,
    commands: commandsForTick,
    activeFaultCodes: faultResult.activeFaultCodes,
  };

  const stepResult = runRuntimeStep(stepContext);

  const nextHistory = appendRuntimeHistoryEntry(history, stepResult);
  const nextEvents = [...accumulatedEvents, ...stepResult.events];

  const nextContext = advanceRuntimeContext(
    stepContext,
    stepResult,
    [],
    faultResult.activeFaultCodes,
  );

  return runLoopRecursive(
    nextContext,
    options,
    nextHistory,
    nextEvents,
    currentIteration + 1,
  );
};