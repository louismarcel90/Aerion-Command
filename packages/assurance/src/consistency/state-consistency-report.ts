import type { Digest } from "@aerion/contracts";

export type StateConsistencyReport = {
  readonly expectedDigest: Digest;
  readonly actualDigest: Digest;
  readonly consistent: boolean;
};