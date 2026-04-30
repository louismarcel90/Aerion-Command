import type { FaultCode } from "@aerion/contracts";
import { evaluateDegradedModePolicy } from "../degraded/evaluate-degraded-mode-policy.js";
import { runAssuranceInvariants } from "../invariants/invariant-registry.js";
import { evaluateSafetyEnvelopes } from "../safety/evaluate-safety-envelopes.js";
import { verifyStateConsistency } from "../consistency/verify-state-consistency.js";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { AssuranceReport } from "./assurance-report.js";

export const buildAssuranceReport = (
  state: AuthoritativeSimulationState,
  activeFaultCodes: readonly FaultCode[],
): AssuranceReport => {
  const invariantResults = runAssuranceInvariants(state);
  const safetyEnvelopeReport = evaluateSafetyEnvelopes(state);
  const degradedModePolicy = evaluateDegradedModePolicy(activeFaultCodes);
  const consistencyReport = verifyStateConsistency(state, state.stateDigest);

  return {
    tick: state.tick,
    passed:
      invariantResults.every((result) => result.passed) &&
      consistencyReport.consistent,
    invariantResults,
    safetyEnvelopeReport,
    degradedModePolicy,
    consistencyReport,
  };
};