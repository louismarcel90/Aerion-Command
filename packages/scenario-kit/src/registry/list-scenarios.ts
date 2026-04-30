import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { scenarioRegistry } from "../packs/scenario-registry.js";
export type ScenarioSummary = {
  readonly scenarioId: string;
  readonly kind: string;
  readonly title: string;
  readonly version: string;
};

export const listScenarioSummaries = (): readonly ScenarioSummary[] => {
  return scenarioRegistry.map((scenario: ScenarioDefinition) => ({
    scenarioId: scenario.metadata.scenarioId,
    kind: scenario.metadata.kind,
    title: scenario.metadata.title,
    version: scenario.metadata.version,
  }));
};