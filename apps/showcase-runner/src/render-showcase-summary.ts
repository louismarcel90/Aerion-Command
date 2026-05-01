import type { ShowcaseSummary } from "./showcase-summary.js";

export const renderShowcaseSummary = (summary: ShowcaseSummary): string => {
  return [
    "",
    "SHOWCASE SUMMARY",
    "----------------",
    `Mission id       : ${summary.missionId}`,
    `Ticks executed   : ${summary.ticksExecuted}`,
    `Final tick       : ${summary.finalTick}`,
    `Mission status   : ${summary.missionStatus}`,
    `Events captured  : ${summary.eventCount}`,
    `Replay status    : ${summary.replayStatus}`,
    `Assurance passed : ${summary.assurancePassed}`,
    `Debrief sections : ${summary.debriefSectionCount}`,
  ].join("\n");
};