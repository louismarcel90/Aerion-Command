import type {
  AircraftId,
  MissionId,
  ScenarioId,
  SimulationSeed,
  SimulationTick,
} from "@aerion/contracts";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asScenarioId = (value: string): ScenarioId => {
  return value as ScenarioId;
};

export const asSimulationSeed = (value: number): SimulationSeed => {
  return value as SimulationSeed;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};