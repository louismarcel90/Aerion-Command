import type { ScenarioId } from "@aerion/contracts";
import { combatScenario } from "../packs/combat-scenario.js";
import { degradedScenario } from "../packs/degraded-scenario.js";
import { evaluationScenario } from "../packs/evaluation-scenario.js";
import { failureScenario } from "../packs/failure-scenario.js";
import { showcaseScenario } from "../packs/showcase-scenario.js";
import { trainingScenario } from "../packs/training-scenario.js";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";

export const scenarioRegistry: readonly ScenarioDefinition[] = [
  trainingScenario,
  combatScenario,
  degradedScenario,
  failureScenario,
  showcaseScenario,
  evaluationScenario,
];

export const findScenarioById = (
  scenarioId: ScenarioId,
): ScenarioDefinition | null => {
  return (
    scenarioRegistry.find(
      (scenario) => scenario.metadata.scenarioId === scenarioId,
    ) ?? null
  );
};