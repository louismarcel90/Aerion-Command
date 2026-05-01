import type { RuntimeDebriefResult } from "../runtime-debrief-result.js";

export const renderDebriefToString = (
  result: RuntimeDebriefResult,
): string => {
  const { summary } = result;

  const lines: string[] = [];

  lines.push("┌──────────────────────────────────────────────┐");
  lines.push("│ AERION COMMAND — MISSION DEBRIEF             │");
  lines.push("├──────────────────────────────────────────────┤");
  lines.push(`│ STATUS : ${summary.outcomeStatus}`);
  lines.push(`│ SCORE  : ${summary.score.totalScore}`);
  lines.push("├──────────────────────────────────────────────┤");

  lines.push("│ TIMELINE                                     │");

  summary.sections.slice(0, 3).forEach((section) => {
    lines.push(`│ ${section.title}`);

    section.lines.slice(0, 5).forEach((line) => {
      lines.push(`│   - ${line}`);
    });
  });

  lines.push("└──────────────────────────────────────────────┘");

  return lines.join("\n");
};