import type { ScenarioId, SimulationSeed } from "@aerion/contracts";
import type { ScenarioKind } from "./scenario-kind.js";

export type ScenarioMetadata = {
  readonly scenarioId: ScenarioId;
  readonly version: string;
  readonly kind: ScenarioKind;
  readonly title: string;
  readonly briefing: string;
  readonly seed: SimulationSeed;
  readonly recommendedDurationTicks: number;
};