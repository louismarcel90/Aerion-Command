import type { SimulationTick } from "@aerion/contracts";
import type { StateConsistencyReport } from "../consistency/state-consistency-report.js";
import type { DegradedModePolicy } from "../degraded/degraded-mode-policy.js";
import type { AssuranceInvariantResult } from "../invariants/assurance-invariant.js";
import type { SafetyEnvelopeReport } from "../safety/safety-envelope-report.js";

export type AssuranceReport = {
  readonly tick: SimulationTick;
  readonly passed: boolean;
  readonly invariantResults: readonly AssuranceInvariantResult[];
  readonly safetyEnvelopeReport: SafetyEnvelopeReport;
  readonly degradedModePolicy: DegradedModePolicy;
  readonly consistencyReport: StateConsistencyReport;
};