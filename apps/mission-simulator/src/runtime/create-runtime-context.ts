import type { MissionCommand } from "@aerion/contracts";
import type { FaultCode, MissionId } from "@aerion/contracts";
import {
  buildInitialStateFromScenario,
  showcaseScenario,
} from "@aerion/scenario-kit";
import type { ScenarioDefinition } from "@aerion/scenario-kit";
import {
  createSeededRandomProvider,
  createSimulationClock,
  createSimulationScheduler,
} from "@aerion/simulation-kernel";
import type { RuntimeContext } from "./runtime-context.js";

export type CreateRuntimeContextInput = {
  readonly missionId: MissionId;
  readonly scenario?: ScenarioDefinition;
  readonly commands?: readonly MissionCommand[];
  readonly activeFaultCodes?: readonly FaultCode[];
  readonly injectedFaultCodes?: readonly FaultCode[];
};

export const createRuntimeContext = (
  input: CreateRuntimeContextInput,
): RuntimeContext => {
  const scenario = input.scenario ?? showcaseScenario;
  const state = buildInitialStateFromScenario(input.missionId, scenario);

  return {
    scenario,
    state,
    commands: input.commands ?? [],
    activeFaultCodes: input.activeFaultCodes ?? [],
    injectedFaultCodes: input.injectedFaultCodes ?? [],
    kernelState: {
      clock: createSimulationClock(state.tick),
      scheduler: createSimulationScheduler(),
      randomProvider: createSeededRandomProvider(state.seed),
    },
  };
};