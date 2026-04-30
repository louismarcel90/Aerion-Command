import type { ScenarioAircraftDefinition } from "./scenario-aircraft-definition.js";
import type { ScenarioFaultDefinition } from "./scenario-fault-definition.js";
import type { ScenarioMetadata } from "./scenario-metadata.js";
import type { ScenarioObjectiveDefinition } from "./scenario-objective-definition.js";

export type ScenarioDefinition = {
  readonly metadata: ScenarioMetadata;
  readonly aircraft: readonly ScenarioAircraftDefinition[];
  readonly objectives: readonly ScenarioObjectiveDefinition[];
  readonly faults: readonly ScenarioFaultDefinition[];
  readonly scoringWeights: ScenarioScoringWeights;
};

export type ScenarioScoringWeights = {
  readonly objectiveWeight: number;
  readonly survivalWeight: number;
  readonly efficiencyWeight: number;
};