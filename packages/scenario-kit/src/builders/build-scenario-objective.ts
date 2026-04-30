import {
  createMissionObjective,
  MissionObjectiveStatus,
} from "@aerion/domain";
import type { MissionObjective } from "@aerion/domain";
import type { ScenarioObjectiveDefinition } from "../schema/scenario-objective-definition.js";

export const buildScenarioObjective = (
  definition: ScenarioObjectiveDefinition,
): MissionObjective => {
  return createMissionObjective({
    objectiveId: definition.objectiveId,
    type: definition.type,
    label: definition.label,
    status: MissionObjectiveStatus.Active,
    priority: definition.priority,
  });
};