import type { MissionId, ReasonCode, SimulationTick } from "@aerion/contracts";

export type DebriefTimelineEntry = {
  readonly tick: SimulationTick;
  readonly label: string;
  readonly reasonCode: ReasonCode;
};

export type DebriefRecord = {
  readonly missionId: MissionId;
  readonly outcomeLabel: string;
  readonly outcomeReasons: readonly ReasonCode[];
  readonly timeline: readonly DebriefTimelineEntry[];
  readonly score: number;
};

export const createDebriefRecord = (input: DebriefRecord): DebriefRecord => {
  return {
    ...input,
    score: Math.max(0, input.score),
  };
};