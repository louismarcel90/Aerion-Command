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

export const failureScenario: ScenarioDefinition = {
  metadata: {
    scenarioId: asScenarioId("scenario-failure-command-path"),
    version: "1.0.0",
    kind: ScenarioKind.Failure,
    title: "Command Path Failure",
    briefing: "Validate behavior when live commands are dropped or delayed.",
    seed: asSimulationSeed(404),
    recommendedDurationTicks: 120,
  },
  aircraft: [
    {
      aircraftId: asAircraftId("aircraft-player-1"),
      callsign: "P1",
      role: AircraftRole.Player,
      x: 40,
      y: 15,
      altitudeFeet: 18000,
      speedKnots: 690,
      headingDegrees: 0,
      fuelPercentage: 72,
      missileInventory: 2,
      countermeasureCount: 3,
    },
    {
      aircraftId: asAircraftId("aircraft-enemy-1"),
      callsign: "E1",
      role: AircraftRole.Enemy,
      x: 40,
      y: 6,
      altitudeFeet: 17700,
      speedKnots: 670,
      headingDegrees: 180,
      fuelPercentage: 80,
      missileInventory: 1,
      countermeasureCount: 2,
    },
  ],
  objectives: [
    {
      objectiveId: "objective-failure-survive",
      type: MissionObjectiveType.Survive,
      label: "Survive while command path faults are active.",
      priority: 1,
    },
  ],
  faults: [
    {
      faultCode: FaultCode.CommandDropped,
      injectAtTick: asSimulationTick(5),
      durationTicks: 5,
    },
    {
      faultCode: FaultCode.CommandDelayed,
      injectAtTick: asSimulationTick(18),
      durationTicks: 6,
    },
  ],
  scoringWeights: {
    objectiveWeight: 1,
    survivalWeight: 1,
    efficiencyWeight: 1,
  },
};