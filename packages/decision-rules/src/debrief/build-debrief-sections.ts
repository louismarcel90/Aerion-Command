import type { MissionScore, MissionTimelineEntry } from "@aerion/mission-engine";
import type { OutcomeReasonChain } from "../chains/outcome-reason-chain.js";
import type { DebriefSection } from "./debrief-section.js";
import type { MissedOpportunity } from "../missed-opportunities/missed-opportunity.js";

export const buildDebriefSections = (
  score: MissionScore,
  timelineEntries: readonly MissionTimelineEntry[],
  reasonChain: OutcomeReasonChain,
  missedOpportunities: readonly MissedOpportunity[],
): readonly DebriefSection[] => {
  return [
    {
      title: "Mission Score",
      lines: [
        `Total score: ${score.totalScore}`,
        `Objective score: ${score.objectiveScore}`,
        `Survival score: ${score.survivalScore}`,
        `Efficiency score: ${score.efficiencyScore}`,
      ],
    },
    {
      title: "Mission Timeline",
      lines:
        timelineEntries.length === 0
          ? ["No timeline entries recorded."]
          : timelineEntries.map(
              (entry) => `[${entry.tick}] ${entry.label} / ${entry.reasonCode}`,
            ),
    },
    {
      title: "Outcome Reason Chain",
      lines:
        reasonChain.entries.length === 0
          ? ["No reason chain entries recorded."]
          : reasonChain.entries.map(
              (entry) => `[${entry.tick}] ${entry.reasonCode}`,
            ),
    },
    {
      title: "Missed Opportunities",
      lines:
        missedOpportunities.length === 0
          ? ["No missed opportunities detected."]
          : missedOpportunities.map(
              (opportunity) =>
                `[${opportunity.tick}] ${opportunity.label} / ${opportunity.reasonCode}`,
            ),
    },
  ];
};