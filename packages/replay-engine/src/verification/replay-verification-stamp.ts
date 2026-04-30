import type {
  Digest,
  ReplayVerificationStatus,
  SimulationTick,
} from "@aerion/contracts";
import type { ReasonCode } from "@aerion/contracts";

export type ReplayVerificationStamp = {
  readonly status: ReplayVerificationStatus;
  readonly verifiedAtTick: SimulationTick;
  readonly expectedDigest: Digest;
  readonly actualDigest: Digest;
  readonly reasonCode: ReasonCode;
};