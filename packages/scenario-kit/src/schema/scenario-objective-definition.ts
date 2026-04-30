import type { MissionObjectiveType } from "@aerion/domain";

export type ScenarioObjectiveDefinition = {
  readonly objectiveId: string;
  readonly type: MissionObjectiveType;
  readonly label: string;
  readonly priority: number;
};