import type { FaultCode, MissionCommand } from "@aerion/contracts";
import type { ScenarioDefinition } from "@aerion/scenario-kit";
import type { SimulationKernelState } from "@aerion/simulation-kernel";
import type { AuthoritativeSimulationState } from "@aerion/state-store";

export type RuntimeContext = {
  readonly scenario: ScenarioDefinition;
  readonly state: AuthoritativeSimulationState;
  readonly kernelState: SimulationKernelState;
  readonly commands: readonly MissionCommand[];
  readonly activeFaultCodes: readonly FaultCode[];
};