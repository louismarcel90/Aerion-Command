import { FaultCode } from "@aerion/contracts";
import { AircraftRole, MissionObjectiveType } from "@aerion/domain";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import { ScenarioKind } from "../schema/scenario-kind.js";
import {
  asAircraftId,
  asScenarioId,
  asSimulationSeed,
  asSimulationTick,
} from "../fixtures/scenario-id-helpers.js";

export const degradedScenario: ScenarioDefinition = {
  metadata: {
    scenarioId: asScenarioId("scenario-degraded-sensor-corridor"),
    version: "1.0.0",
    kind: ScenarioKind.Degraded,
    title: "Sensor Degradation Corridor",
    briefing: "Complete intercept under radar degradation and partial HUD conditions.",
    seed: asSimulationSeed(303),
    recommendedDurationTicks: 140,
  },
  aircraft: [
    {
      aircraftId: asAircraftId("aircraft-player-1"),
      callsign: "P1",
      role: AircraftRole.Player,
      x: 38,
      y: 16,
      altitudeFeet: 18500,
      speedKnots: 700,
      headingDegrees: 0,
      fuelPercentage: 68,
      missileInventory: 2,
      countermeasureCount: 3,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-1"),
      callsign: "E1",
      role: AircraftRole.Enemy,
      x: 41,
      y: 5,
      altitudeFeet: 18000,
      speedKnots: 680,
      headingDegrees: 180,
      fuelPercentage: 74,
      missileInventory: 1,
      countermeasureCount: 2,
    },
  ],
  objectives: [
    {
      objectiveId: "objective-degraded-intercept",
      type: MissionObjectiveType.Intercept,
      label: "Intercept under degraded sensor conditions.",
      priority: 1,
    },
  ],
  faults: [
    {
      faultCode: FaultCode.RadarDegraded,
      injectAtTick: asSimulationTick(8),
      durationTicks: 16,
    },
    {
      faultCode: FaultCode.HudPartial,
      injectAtTick: asSimulationTick(20),
      durationTicks: 10,
    },
  ],
  scoringWeights: {
    objectiveWeight: 1,
    survivalWeight: 1,
    efficiencyWeight: 1,
  },
};