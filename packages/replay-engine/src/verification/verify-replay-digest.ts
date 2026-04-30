import { ReasonCode, ReplayVerificationStatus } from "@aerion/contracts";
import type { Digest, SimulationTick } from "@aerion/contracts";
import type { ReplayVerificationStamp } from "./replay-verification-stamp.js";

export const verifyReplayDigest = (
  expectedDigest: Digest,
  actualDigest: Digest,
  verifiedAtTick: SimulationTick,
): ReplayVerificationStamp => {
  if (expectedDigest === actualDigest) {
    return {
      status: ReplayVerificationStatus.Verified,
      verifiedAtTick,
      expectedDigest,
      actualDigest,
      reasonCode: ReasonCode.ReplayVerified,
    };
  }

  return {
    status: ReplayVerificationStatus.DriftDetected,
    verifiedAtTick,
    expectedDigest,
    actualDigest,
    reasonCode: ReasonCode.ReplayDriftDetected,
  };
};