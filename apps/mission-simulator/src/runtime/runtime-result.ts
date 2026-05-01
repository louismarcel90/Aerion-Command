import type { AssuranceReport } from "@aerion/assurance";
import type { SimulationEvent } from "@aerion/contracts";
import type { AsciiScreen } from "@aerion/renderer-ascii";
import type { SimulationStepReport } from "@aerion/simulation-kernel";
import type { AuthoritativeSimulationState } from "@aerion/state-store";

export type RuntimeStepResult = {
  readonly state: AuthoritativeSimulationState;
  readonly events: readonly SimulationEvent[];
  readonly stepReport: SimulationStepReport;
  readonly assuranceReport: AssuranceReport;
  readonly screen: AsciiScreen;
};