import type {
  RuntimeLoopResult,
  RuntimeReplayResult,
} from "@aerion/mission-simulator";

export type ShowcaseSummary = {
  readonly missionId: string;
  readonly ticksExecuted: number;
  readonly finalTick: number;
  readonly missionStatus: string;
  readonly eventCount: number;
  readonly replayStatus: string;
  readonly assurancePassed: boolean;
  readonly debriefSectionCount: number;
};

export const buildShowcaseSummary = (
  loopResult: RuntimeLoopResult,
  replayResult: RuntimeReplayResult,
  debriefSectionCount: number,
): ShowcaseSummary => {
  const lastEntry = loopResult.history.entries[loopResult.history.entries.length - 1];

  if (lastEntry === undefined) {
    throw new Error("Showcase summary requires runtime history.");
  }

  return {
    missionId: loopResult.finalContext.state.missionId,
    ticksExecuted: loopResult.history.entries.length,
    finalTick: loopResult.finalContext.state.tick,
    missionStatus: loopResult.finalContext.state.missionStatus,
    eventCount: loopResult.accumulatedEvents.length,
    replayStatus: replayResult.verificationStamp.status,
    assurancePassed: lastEntry.assuranceReport.passed,
    debriefSectionCount,
  };
};