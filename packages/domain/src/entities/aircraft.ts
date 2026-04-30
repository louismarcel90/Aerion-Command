import type { AircraftId, TrackId } from "@aerion/contracts";
import type { TacticalMeasurements } from "../value-objects/tactical-measurements.js";
import type { TacticalPosition } from "../value-objects/tactical-position.js";

export const AircraftRole = {
  Player: "PLAYER",
  Escort: "ESCORT",
  Enemy: "ENEMY",
  Neutral: "NEUTRAL",
} as const;

export type AircraftRole = (typeof AircraftRole)[keyof typeof AircraftRole];

export type Aircraft = {
  readonly aircraftId: AircraftId;
  readonly callsign: string;
  readonly role: AircraftRole;
  readonly position: TacticalPosition;
  readonly measurements: TacticalMeasurements;
  readonly lockedTrackId: TrackId | null;
  readonly countermeasureCount: number;
  readonly missileInventory: number;
  readonly isDestroyed: boolean;
};

export const createAircraft = (input: Aircraft): Aircraft => {
  return {
    ...input,
    countermeasureCount: Math.max(0, input.countermeasureCount),
    missileInventory: Math.max(0, input.missileInventory),
  };
};