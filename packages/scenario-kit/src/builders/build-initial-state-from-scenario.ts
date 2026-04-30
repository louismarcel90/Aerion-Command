import { createInitialSimulationState } from "@aerion/state-store";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { MissionId } from "@aerion/contracts";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { buildScenarioAircraft } from "./build-scenario-aircraft.js";
import { buildScenarioObjective } from "./build-scenario-objective.js";

export const buildInitialStateFromScenario = (
  missionId: MissionId,
  scenario: ScenarioDefinition,
): AuthoritativeSimulationState => {
  return createInitialSimulationState({
    missionId,
    scenarioId: scenario.metadata.scenarioId,
    seed: scenario.metadata.seed,
    aircraft: scenario.aircraft.map(buildScenarioAircraft),
    objectives: scenario.objectives.map(buildScenarioObjective),
  });
};