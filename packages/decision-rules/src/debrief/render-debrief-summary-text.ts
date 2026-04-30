import type { MissionDebriefSummary } from "./mission-debrief-summary.js";

export const renderDebriefSummaryText = (
  summary: MissionDebriefSummary,
): string => {
  const headerLines = [
    "AERION COMMAND — MISSION DEBRIEF",
    `Mission: ${summary.missionId}`,
    `Outcome: ${summary.outcomeStatus}`,
    `Score: ${summary.score.totalScore}`,
  ];

  const sectionLines = summary.sections.flatMap((section) => [
    "",
    section.title,
    "-".repeat(section.title.length),
    ...section.lines,
  ]);

  return [...headerLines, ...sectionLines].join("\n");
};