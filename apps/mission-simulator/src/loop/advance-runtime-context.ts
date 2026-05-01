import type { FaultCode, MissionCommand } from "@aerion/contracts";
import {
  createSeededRandomProvider,
  createSimulationClock,
  createSimulationScheduler,
} from "@aerion/simulation-kernel";
import type { RuntimeContext } from "../runtime/runtime-context.js";
import type { RuntimeStepResult } from "../runtime/runtime-result.js";

export const advanceRuntimeContext = (
  context: RuntimeContext,
  result: RuntimeStepResult,
  commands: readonly MissionCommand[],
  activeFaultCodes: readonly FaultCode[],
  injectedFaultCodes: readonly FaultCode[],
): RuntimeContext => {
  return {
    ...context,
    state: result.state,
    kernelState: {
      clock: createSimulationClock(result.state.tick),
      scheduler: createSimulationScheduler(),
      randomProvider: createSeededRandomProvider(result.state.seed),
    },
    commands,
    activeFaultCodes,
    injectedFaultCodes,
  };
};