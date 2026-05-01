import type { AssuranceReport } from "@aerion/assurance";
import type { SimulationEvent } from "@aerion/contracts";
import type { AsciiScreen } from "@aerion/renderer-ascii";
import type { SimulationStepReport } from "@aerion/simulation-kernel";
import type { AuthoritativeSimulationState } from "@aerion/state-store";

export type RuntimeHistoryEntry = {
  readonly state: AuthoritativeSimulationState;
  readonly events: readonly SimulationEvent[];
  readonly stepReport: SimulationStepReport;
  readonly assuranceReport: AssuranceReport;
  readonly screen: AsciiScreen;
};

export type RuntimeHistory = {
  readonly entries: readonly RuntimeHistoryEntry[];
};

export const createRuntimeHistory = (
  entries: readonly RuntimeHistoryEntry[] = [],
): RuntimeHistory => {
  return {
    entries,
  };
};

export const appendRuntimeHistoryEntry = (
  history: RuntimeHistory,
  entry: RuntimeHistoryEntry,
): RuntimeHistory => {
  return {
    entries: [...history.entries, entry],
  };
};