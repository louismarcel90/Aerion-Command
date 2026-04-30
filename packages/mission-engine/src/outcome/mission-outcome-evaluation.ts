import type { MissionStatus, ReasonCode } from "@aerion/contracts";

export type MissionOutcomeEvaluation = {
  readonly nextStatus: MissionStatus;
  readonly changed: boolean;
  readonly reasonCode: ReasonCode | null;
};