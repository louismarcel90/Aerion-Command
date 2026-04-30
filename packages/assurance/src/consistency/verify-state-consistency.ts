import type { Digest } from "@aerion/contracts";
import { computeStateDigest } from "@aerion/state-store";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { StateConsistencyReport } from "./state-consistency-report.js";

export const verifyStateConsistency = (
  state: AuthoritativeSimulationState,
  expectedDigest: Digest,
): StateConsistencyReport => {
  const { stateDigest, ...stateWithoutDigest } = state;
  void stateDigest;

  const actualDigest = computeStateDigest(stateWithoutDigest);

  return {
    expectedDigest,
    actualDigest,
    consistent: actualDigest === expectedDigest,
  };
};