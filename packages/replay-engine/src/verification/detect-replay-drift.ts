import type { Digest, SimulationTick } from "@aerion/contracts";
import { verifyReplayDigest } from "./verify-replay-digest.js";
import type { ReplayVerificationStamp } from "./replay-verification-stamp.js";

export type ReplayDriftDetectionInput = {
  readonly expectedDigest: Digest;
  readonly reconstructedDigest: Digest;
  readonly tick: SimulationTick;
};

export const detectReplayDrift = (
  input: ReplayDriftDetectionInput,
): ReplayVerificationStamp => {
  return verifyReplayDigest(
    input.expectedDigest,
    input.reconstructedDigest,
    input.tick,
  );
};