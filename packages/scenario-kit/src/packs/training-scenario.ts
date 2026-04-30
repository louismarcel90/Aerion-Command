import { AircraftRole, MissionObjectiveType } from "@aerion/domain";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { ScenarioKind } from "../schema/scenario-kind.js";
import {
  asAircraftId,
  asScenarioId,
  asSimulationSeed,
} from "../fixtures/scenario-id-helpers.js";

export const trainingScenario: ScenarioDefinition = {
  metadata: {
    scenarioId: asScenarioId("scenario-training-first-contact"),
    version: "1.0.0",
    kind: ScenarioKind.Training,
    title: "First Contact Training",
    briefing: "Learn core flight controls, radar acquisition, lock and launch discipline.",
    seed: asSimulationSeed(101),
    recommendedDurationTicks: 90,
  },
  aircraft: [
    {
      aircraftId: asAircraftId("aircraft-player-1"),
      callsign: "P1",
      role: AircraftRole.Player,
      x: 40,
      y: 14,
      altitudeFeet: 18000,
      speedKnots: 720,
      headingDegrees: 0,
      fuelPercentage: 85,
      missileInventory: 2,
      countermeasureCount: 3,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-1"),
      callsign: "E1",
      role: AircraftRole.Enemy,
      x: 40,
      y: 4,
      altitudeFeet: 17500,
      speedKnots: 650,
      headingDegrees: 180,
      fuelPercentage: 80,
      missileInventory: 1,
      countermeasureCount: 2,
    },
  ],
  objectives: [
    {
      objectiveId: "objective-training-intercept",
      type: MissionObjectiveType.Intercept,
      label: "Acquire and intercept the hostile training aircraft.",
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