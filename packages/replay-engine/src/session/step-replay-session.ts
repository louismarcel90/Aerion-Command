import type { SimulationTick } from "@aerion/contracts";
import { eventsAtReplayTick } from "../history/replay-event-history.js";
import { ReplayMode } from "./replay-mode.js";
import type { ReplaySession } from "./replay-session.js";
import type { ReplayStepResult } from "./replay-step-result.js";

export const stepReplaySessionForward = (
  session: ReplaySession,
): ReplayStepResult => {
  const nextTick = (session.currentTick + 1) as SimulationTick;
  const eventsAtTick = eventsAtReplayTick(session.history, nextTick);
  const hasFutureEvents = session.history.events.some(
    (event) => event.occurredAtTick > nextTick,
  );

  return {
    session: {
      ...session,
      currentTick: nextTick,
      mode: hasFutureEvents ? session.mode : ReplayMode.Completed,
    },
    eventsAtTick,
  };
};

export const stepReplaySessionBackward = (
  session: ReplaySession,
): ReplayStepResult => {
  const previousTick = Math.max(0, session.currentTick - 1) as SimulationTick;
  const eventsAtTick = eventsAtReplayTick(session.history, previousTick);

  return {
    session: {
      ...session,
      currentTick: previousTick,
      mode: ReplayMode.Paused,
    },
    eventsAtTick,
  };
};