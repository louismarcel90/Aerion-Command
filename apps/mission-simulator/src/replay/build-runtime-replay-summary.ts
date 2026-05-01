import type { RuntimeReplayResult } from "./runtime-replay-result.js";

export type RuntimeReplaySummary = {
  readonly eventCount: number;
  readonly timelineEntryCount: number;
  readonly verificationStatus: string;
  readonly expectedDigest: string;
  readonly actualDigest: string;
};

export const buildRuntimeReplaySummary = (
  result: RuntimeReplayResult,
): RuntimeReplaySummary => {
  return {
    eventCount: result.eventLog.length,
    timelineEntryCount: result.replaySession.timeline.length,
    verificationStatus: result.verificationStamp.status,
    expectedDigest: result.verificationStamp.expectedDigest,
    actualDigest: result.verificationStamp.actualDigest,
  };
};