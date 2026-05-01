import type { MissionDebriefSummary } from "@aerion/decision-rules";
import type { RuntimeHistory } from "../history/runtime-history.js";
import type { MissionOutcome } from "./domain/mission-outcome.js";
import type { DebriefTimelineEntry } from "@aerion/domain/dist/entities/debrief-record.js";
import type { MissionScore } from "@aerion/mission-engine/dist/score/mission-score.js";
import type { SimulationEvent } from "@aerion/contracts/dist/events/simulation-event.js";
import type { AuthoritativeSnapshot } from "@aerion/contracts/dist/snapshots/authoritative-snapshot.js";

export type RuntimeDebriefResult = {
  readonly summary: MissionDebriefSummary;
  readonly history: RuntimeHistory;
};

export type BuildMissionDebriefSummaryInput = {
  readonly finalSnapshot: AuthoritativeSnapshot;
  readonly events: readonly SimulationEvent[];
  readonly score: MissionScore;
  readonly timelineEntries: readonly DebriefTimelineEntry[];
  readonly missionOutcome: MissionOutcome;
};