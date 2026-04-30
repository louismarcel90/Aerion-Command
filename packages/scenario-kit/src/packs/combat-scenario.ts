import { AircraftRole, MissionObjectiveType } from "@aerion/domain";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { ScenarioKind } from "../schema/scenario-kind.js";
import {
  asAircraftId,
  asScenarioId,
  asSimulationSeed,
} from "../fixtures/scenario-id-helpers.js";

export const combatScenario: ScenarioDefinition = {
  metadata: {
    scenarioId: asScenarioId("scenario-combat-high-threat-zone"),
    version: "1.0.0",
    kind: ScenarioKind.Combat,
    title: "High Threat Zone",
    briefing: "Engage hostile aircraft while preserving fuel and weapon discipline.",
    seed: asSimulationSeed(202),
    recommendedDurationTicks: 160,
  },
  aircraft: [
    {
      aircraftId: asAircraftId("aircraft-player-1"),
      callsign: "P1",
      role: AircraftRole.Player,
      x: 42,
      y: 18,
      altitudeFeet: 21000,
      speedKnots: 760,
      headingDegrees: 0,
      fuelPercentage: 70,
      missileInventory: 2,
      countermeasureCount: 3,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-1"),
      callsign: "E1",
      role: AircraftRole.Enemy,
      x: 34,
      y: 6,
      altitudeFeet: 19000,
      speedKnots: 720,
      headingDegrees: 170,
      fuelPercentage: 76,
      missileInventory: 2,
      countermeasureCount: 2,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-2"),
      callsign: "E2",
      role: AircraftRole.Enemy,
      x: 52,
      y: 5,
      altitudeFeet: 22000,
      speedKnots: 690,
      headingDegrees: 190,
      fuelPercentage: 78,
      missileInventory: 2,
      countermeasureCount: 2,
    },
  ],
  objectives: [
    {
      objectiveId: "objective-combat-intercept",
      type: MissionObjectiveType.Intercept,
      label: "Neutralize at least one hostile threat.",
      priority: 1,
    },
    {
      objectiveId: "objective-combat-survive",
      type: MissionObjectiveType.Survive,
      label: "Survive the high threat window.",
      priority: 2,
    },
  ],
  faults: [],
  scoringWeights: {
    objectiveWeight: 1,
    survivalWeight: 1,
    efficiencyWeight: 1,
  },
};