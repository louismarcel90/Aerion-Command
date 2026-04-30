import type { ReplaySession } from "./replay-session.js";
import type { ReplayVerificationStamp } from "../verification/replay-verification-stamp.js";

export const applyReplayVerification = (
  session: ReplaySession,
  verificationStamp: ReplayVerificationStamp,
): ReplaySession => {
  return {
    ...session,
    verificationStamp,
  };
};