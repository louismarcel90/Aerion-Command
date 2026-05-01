import {
  buildMissionDebriefSummary,
  createDebriefScoreFixture,
  createDebriefTimelineFixture,
} from "@aerion/decision-rules";
import { ReasonCode, type MissionOutcome } from "@aerion/contracts";

import type { RuntimeHistory } from "../../history/runtime-history.js";
import { extractAllEvents } from "./extract-all-events.js";
import { extractFinalSnapshot } from "./extract-final-snapshot.js";

export const buildRuntimeDebriefSummary = (
  history: RuntimeHistory,
) => {
  const finalSnapshot = extractFinalSnapshot(history);
  const events = extractAllEvents(history);

  const score = createDebriefScoreFixture();
  const missionOutcome = computeMissionOutcome(score.totalScore);

  return buildMissionDebriefSummary({
    finalSnapshot,
    events,
    score,
    timelineEntries: createDebriefTimelineFixture(),
    missionOutcome,
  });
};

export const computeMissionOutcome = (
  totalScore: number,
): MissionOutcome => {
  if (totalScore >= 80) {
    return {
      status: "SUCCEEDED",
      reasonCodes: [ReasonCode.MissionSucceededObjectiveComplete],
    };
  }

  if (totalScore >= 50) {
    return {
      status: "FAILED",
      reasonCodes: [ReasonCode.MissionPhaseAdvancedEngagement],
    };
  }

  return {
    status: "FAILED",
    reasonCodes: [ReasonCode.MissionFailedPlayerDestroyed],
  };
};