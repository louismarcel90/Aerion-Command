import { AircraftRole, MissionObjectiveType } from "@aerion/domain";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { ScenarioKind } from "../schema/scenario-kind.js";
import {
  asAircraftId,
  asScenarioId,
  asSimulationSeed,
} from "../fixtures/scenario-id-helpers.js";

export const evaluationScenario: ScenarioDefinition = {
  metadata: {
    scenarioId: asScenarioId("scenario-evaluation-replay-baseline"),
    version: "1.0.0",
    kind: ScenarioKind.Evaluation,
    title: "Replay Evaluation Baseline",
    briefing: "Deterministic baseline scenario for replay, evidence and regression validation.",
    seed: asSimulationSeed(606),
    recommendedDurationTicks: 100,
  },
  aircraft: [
    {
      aircraftId: asAircraftId("aircraft-player-1"),
      callsign: "P1",
      role: AircraftRole.Player,
      x: 35,
      y: 14,
      altitudeFeet: 18000,
      speedKnots: 700,
      headingDegrees: 15,
      fuelPercentage: 80,
      missileInventory: 2,
      countermeasureCount: 3,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-1"),
      callsign: "E1",
      role: AircraftRole.Enemy,
      x: 45,
      y: 5,
      altitudeFeet: 17600,
      speedKnots: 660,
      headingDegrees: 190,
      fuelPercentage: 78,
      missileInventory: 1,
      countermeasureCount: 2,
    },
  ],
  objectives: [
    {
      objectiveId: "objective-evaluation-intercept",
      type: MissionObjectiveType.Intercept,
      label: "Produce deterministic replay baseline.",
      priority: 1,
    },
  ],
  faults: [],
  scoringWeights: {
    objectiveWeight: 1,
    survivalWeight: 1,
    efficiencyWeight: 1,
  },
};