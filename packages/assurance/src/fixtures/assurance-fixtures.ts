import { MissionStatus } from "@aerion/contracts";
import {
  createInitialStateFixture,
  replaceObjectives,
  transitionMissionStatus,
} from "@aerion/state-store";
import {
  createMissionObjective,
  MissionObjectiveStatus,
  MissionObjectiveType,
} from "@aerion/domain";

export const createNominalAssuranceStateFixture = () => {
  return createInitialStateFixture();
};

export const createInvalidSucceededMissionFixture = () => {
  const state = transitionMissionStatus(createInitialStateFixture(), MissionStatus.Succeeded);

  return replaceObjectives(state, [
    createMissionObjective({
      objectiveId: "objective-invalid-1",
      type: MissionObjectiveType.Intercept,
      label: "Invalid incomplete objective",
      status: MissionObjectiveStatus.Pending,
      priority: 1,
    }),
  ]);
};