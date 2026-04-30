import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { MissionScore } from "../score/mission-score.js";
import type { MissionTimelineEntry } from "../timeline/mission-timeline-entry.js";

export type MissionEngineResult = {
  readonly state: AuthoritativeSimulationState;
  readonly score: MissionScore;
  readonly timelineEntries: readonly MissionTimelineEntry[];
};