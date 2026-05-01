import type { RuntimeDebriefResult } from "../runtime-debrief-result.js";

export const renderDebriefToString = (
  result: RuntimeDebriefResult,
): string => {
  const { summary } = result;

  const lines: string[] = [];

  lines.push("┌────────────────────────────────────────────────────────────┐");
  lines.push("│ AERION COMMAND — MISSION DEBRIEF                           │");
  lines.push("├────────────────────────────────────────────────────────────┤");
  lines.push(`│ OUTCOME : ${summary.outcomeStatus}`.padEnd(61, " ") + "│");
  lines.push(`│ SCORE   : ${summary.score.totalScore}`.padEnd(61, " ") + "│");
  lines.push("├────────────────────────────────────────────────────────────┤");

  summary.sections.forEach((section) => {
    lines.push(`│ ${section.title}`.padEnd(61, " ") + "│");

    section.lines.slice(0, 4).forEach((line) => {
      lines.push(`│   ${line}`.slice(0, 61).padEnd(61, " ") + "│");
    });

    lines.push("├────────────────────────────────────────────────────────────┤");
  });

  lines[lines.length - 1] = "└────────────────────────────────────────────────────────────┘";

  return lines.join("\n");
};