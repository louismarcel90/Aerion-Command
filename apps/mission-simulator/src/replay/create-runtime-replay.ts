import { ReplayVerificationStatus } from "@aerion/contracts";
import type { Digest, SimulationTick } from "@aerion/contracts";
import {
  applyReplayVerification,
  createReplaySession,
  verifyReplayDigest,
} from "@aerion/replay-engine";
import type { RuntimeHistory } from "../history/runtime-history.js";
import type { RuntimeReplayResult } from "./runtime-replay-result.js";
import { computeRuntimeHistoryDigest } from "./compute-runtime-history-digest.js";
import { extractRuntimeEventLog } from "./extract-runtime-event-log.js";

export const createRuntimeReplay = (
  history: RuntimeHistory,
  expectedDigest: Digest | null,
  initialReplayTick: SimulationTick,
): RuntimeReplayResult => {
  const eventLog = extractRuntimeEventLog(history);
  const actualDigest = computeRuntimeHistoryDigest(history);
  const digestToVerify = expectedDigest ?? actualDigest;

  const verificationStamp = verifyReplayDigest(
    digestToVerify,
    actualDigest,
    initialReplayTick,
  );

  const replaySession = applyReplayVerification(
    createReplaySession(eventLog, initialReplayTick),
    verificationStamp,
  );

  return {
    replaySession,
    eventLog,
    verificationStamp,
  };
};

export const isRuntimeReplayVerified = (
  result: RuntimeReplayResult,
): boolean => {
  return result.verificationStamp.status === ReplayVerificationStatus.Verified;
};