import type { ReasonCode } from "@aerion/contracts";

export type MissionScore = {
  readonly totalScore: number;
  readonly objectiveScore: number;
  readonly survivalScore: number;
  readonly efficiencyScore: number;
  readonly reasonCode: ReasonCode;
};