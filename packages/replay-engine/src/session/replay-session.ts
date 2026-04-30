import type { SimulationTick } from "@aerion/contracts";
import type { ReplayCheckpointStore } from "../checkpoint/checkpoint-store.js";
import type { ReplayEventHistory } from "../history/replay-event-history.js";
import type { ReplayTimelineEntry } from "../timeline/replay-timeline-entry.js";
import type { ReplayVerificationStamp } from "../verification/replay-verification-stamp.js";
import type { ReplayMode } from "./replay-mode.js";

export type ReplaySession = {
  readonly mode: ReplayMode;
  readonly currentTick: SimulationTick;
  readonly history: ReplayEventHistory;
  readonly checkpointStore: ReplayCheckpointStore;
  readonly timeline: readonly ReplayTimelineEntry[];
  readonly verificationStamp: ReplayVerificationStamp | null;
};