import type { AircraftId } from "@aerion/contracts";
import type { AircraftRole } from "@aerion/domain";

export type ScenarioAircraftDefinition = {
  readonly aircraftId: AircraftId;
  readonly callsign: string;
  readonly role: AircraftRole;
  readonly x: number;
  readonly y: number;
  readonly altitudeFeet: number;
  readonly speedKnots: number;
  readonly headingDegrees: number;
  readonly fuelPercentage: number;
  readonly missileInventory: number;
  readonly countermeasureCount: number;
};