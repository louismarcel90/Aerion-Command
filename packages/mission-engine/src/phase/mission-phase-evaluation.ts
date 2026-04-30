import type { MissionPhase, ReasonCode } from "@aerion/contracts";

export type MissionPhaseEvaluation = {
  readonly nextPhase: MissionPhase;
  readonly changed: boolean;
  readonly reasonCode: ReasonCode | null;
};