import type {
  MissionId,
  ScenarioId,
  SimulationSeed,
} from "@aerion/contracts";
import {
  createMissionObjective,
  MissionObjectiveStatus,
  MissionObjectiveType,
  createPlayerAircraftFixture,
} from "@aerion/domain";
import { createInitialSimulationState } from "../state/initial-simulation-state.js";

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asScenarioId = (value: string): ScenarioId => {
  return value as ScenarioId;
};

export const asSimulationSeed = (value: number): SimulationSeed => {
  return value as SimulationSeed;
};

export const createInitialStateFixture = () => {
  return createInitialSimulationState({
    missionId: asMissionId("mission-001"),
    scenarioId: asScenarioId("scenario-first-contact"),
    seed: asSimulationSeed(42),
    aircraft: [createPlayerAircraftFixture()],
    objectives: [
      createMissionObjective({
        objectiveId: "objective-intercept-1",
        type: MissionObjectiveType.Intercept,
        label: "Intercept hostile aircraft",
        status: MissionObjectiveStatus.Pending,
        priority: 1,
      }),
    ],
  });
};