import type { SimulationEvent, SimulationTick } from "@aerion/contracts";
import {
  createReplayCheckpointStore,
} from "../checkpoint/checkpoint-store.js";
import { createReplayEventHistory } from "../history/replay-event-history.js";
import { buildReplayTimeline } from "../timeline/build-replay-timeline.js";
import { ReplayMode } from "./replay-mode.js";
import type { ReplaySession } from "./replay-session.js";

export const createReplaySession = (
  events: readonly SimulationEvent[],
  initialTick: SimulationTick,
): ReplaySession => {
  const history = createReplayEventHistory(events);

  return {
    mode: ReplayMode.Paused,
    currentTick: initialTick,
    history,
    checkpointStore: createReplayCheckpointStore(),
    timeline: buildReplayTimeline(history.events),
    verificationStamp: null,
  };
};