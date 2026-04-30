import { AircraftRole, MissionObjectiveType } from "@aerion/domain";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { ScenarioKind } from "../schema/scenario-kind.js";
import {
  asAircraftId,
  asScenarioId,
  asSimulationSeed,
} from "../fixtures/scenario-id-helpers.js";

export const showcaseScenario: ScenarioDefinition = {
  metadata: {
    scenarioId: asScenarioId("scenario-showcase-recruiter-intercept"),
    version: "1.0.0",
    kind: ScenarioKind.Showcase,
    title: "Recruiter Showcase Intercept",
    briefing: "Short, high-impact mission designed to show terminal HUD, lock, launch, replay and debrief readiness.",
    seed: asSimulationSeed(505),
    recommendedDurationTicks: 80,
  },
  aircraft: [
    {
      aircraftId: asAircraftId("aircraft-player-1"),
      callsign: "P1",
      role: AircraftRole.Player,
      x: 40,
      y: 13,
      altitudeFeet: 18200,
      speedKnots: 742,
      headingDegrees: 34,
      fuelPercentage: 71,
      missileInventory: 2,
      countermeasureCount: 3,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-2"),
      callsign: "E2",
      role: AircraftRole.Enemy,
      x: 18,
      y: 5,
      altitudeFeet: 17800,
      speedKnots: 710,
      headingDegrees: 120,
      fuelPercentage: 79,
      missileInventory: 1,
      countermeasureCount: 2,
    },
  ],
  objectives: [
    {
      objectiveId: "objective-showcase-intercept",
      type: MissionObjectiveType.Intercept,
      label: "Execute a clean intercept sequence for showcase review.",
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