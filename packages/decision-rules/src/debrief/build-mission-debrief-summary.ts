import type { MissionOutcome, SimulationEvent } from "@aerion/contracts";
import type { MissionScore, MissionTimelineEntry } from "@aerion/mission-engine";
import type { AuthoritativeSnapshot,  } from "@aerion/contracts";
import { buildOutcomeReasonChain } from "../chains/build-outcome-reason-chain.js";
import { detectMissedOpportunities } from "../missed-opportunities/detect-missed-opportunities.js";
import { buildDebriefSections } from "./build-debrief-sections.js";
import type { MissionDebriefSummary } from "./mission-debrief-summary.js";

export type BuildMissionDebriefSummaryInput = {
  readonly finalSnapshot: AuthoritativeSnapshot;
  readonly score: MissionScore;
  readonly missionOutcome: MissionOutcome;
  readonly timelineEntries: readonly MissionTimelineEntry[];
  readonly events: readonly SimulationEvent[];
};

export const buildMissionDebriefSummary = (
  input: BuildMissionDebriefSummaryInput,
): MissionDebriefSummary => {
  const reasonSources = [
    ...input.timelineEntries.map((entry) => ({
      tick: entry.tick,
      reasonCode: entry.reasonCode,
    })),
    ...input.events.map((event) => ({
      tick: event.occurredAtTick,
      reasonCode: event.reasonCode,
    })),
  ];

  const reasonChain = buildOutcomeReasonChain(
    input.finalSnapshot.missionId,
    "Mission Outcome Reason Chain",
    reasonSources,
  );

  const missedOpportunities = detectMissedOpportunities(input.events);

  return {
  missionId: input.finalSnapshot.missionId,
  outcomeStatus: input.finalSnapshot.missionStatus,
  score: input.score,
  missionOutcome: input.missionOutcome,
  reasonChain,
  sections: buildDebriefSections(
    input.score,
    input.timelineEntries,
    reasonChain,
    missedOpportunities,
  ),
};
};