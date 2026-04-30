import type { ReasonCode } from "@aerion/contracts";
import type { MissionObjective } from "@aerion/domain";

export type ObjectiveEvaluation = {
  readonly objective: MissionObjective;
  readonly changed: boolean;
  readonly reasonCode: ReasonCode | null;
};