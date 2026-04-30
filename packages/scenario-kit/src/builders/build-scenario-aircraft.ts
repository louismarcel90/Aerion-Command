import {
  createAircraft,
  createTacticalMeasurements,
  createTacticalPosition,
} from "@aerion/domain";
import type { Aircraft } from "@aerion/domain";
import type { ScenarioAircraftDefinition } from "../schema/scenario-aircraft-definition.js";

export const buildScenarioAircraft = (
  definition: ScenarioAircraftDefinition,
): Aircraft => {
  return createAircraft({
    aircraftId: definition.aircraftId,
    callsign: definition.callsign,
    role: definition.role,
    position: createTacticalPosition({
      x: definition.x,
      y: definition.y,
      altitudeFeet: definition.altitudeFeet,
    }),
    measurements: createTacticalMeasurements({
      speedKnots: definition.speedKnots,
      altitudeFeet: definition.altitudeFeet,
      headingDegrees: definition.headingDegrees,
      fuelPercentage: definition.fuelPercentage,
    }),
    lockedTrackId: null,
    countermeasureCount: definition.countermeasureCount,
    missileInventory: definition.missileInventory,
    isDestroyed: false,
  });
};