import type { SimulationEvent } from "@aerion/contracts";
import type {
  ReplaySession,
  ReplayVerificationStamp,
} from "@aerion/replay-engine";

export type RuntimeReplayResult = {
  readonly replaySession: ReplaySession;
  readonly eventLog: readonly SimulationEvent[];
  readonly verificationStamp: ReplayVerificationStamp;
};