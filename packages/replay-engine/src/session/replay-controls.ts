import { ReplayMode } from "./replay-mode.js";
import type { ReplaySession } from "./replay-session.js";

export const playReplaySession = (session: ReplaySession): ReplaySession => {
  if (session.mode === ReplayMode.Completed) {
    return session;
  }

  return {
    ...session,
    mode: ReplayMode.Playing,
  };
};

export const pauseReplaySession = (session: ReplaySession): ReplaySession => {
  return {
    ...session,
    mode: ReplayMode.Paused,
  };
};

export const toggleReplaySessionPlayback = (
  session: ReplaySession,
): ReplaySession => {
  return session.mode === ReplayMode.Playing
    ? pauseReplaySession(session)
    : playReplaySession(session);
};