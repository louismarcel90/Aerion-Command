import {
  advanceRuntimeContext,
  runRuntimeStep,
} from "@aerion/mission-simulator";
import type { LiveTerminalState } from "./live-terminal-state.js";

export const advanceLiveTerminal = (
  state: LiveTerminalState,
): {
  readonly state: LiveTerminalState;
  readonly output: string;
} => {
  const stepContext = {
    ...state.context,
    commands: state.pendingCommands,
    injectedFaultCodes: [],
  };

  const result = runRuntimeStep(stepContext);

  const accumulatedEvents = [...state.accumulatedEvents, ...result.events];

  const nextContext = advanceRuntimeContext(
    stepContext,
    result,
    [],
    state.context.activeFaultCodes,
    [],
  );

  return {
    state: {
      context: nextContext,
      pendingCommands: [],
      accumulatedEvents,
      running: state.running,
    },
    output: "",
  };
};