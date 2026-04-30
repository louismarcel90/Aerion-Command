import type {
  AircraftId,
  MissileId,
  MissionId,
  SimulationTick,
  TrackId,
} from "@aerion/contracts";import type { Aircraft } from "../entities/aircraft.js";
import { AircraftRole, createAircraft } from "../entities/aircraft.js";
import type { RadarTrack } from "../entities/radar-track.js";
import { TrackStatus, createRadarTrack } from "../entities/radar-track.js";
import { createTacticalMeasurements } from "../value-objects/tactical-measurements.js";
import { createTacticalPosition } from "../value-objects/tactical-position.js";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const asMissileId = (value: string): MissileId => {
  return value as MissileId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createPlayerAircraftFixture = (): Aircraft => {
  return createAircraft({
    aircraftId: asAircraftId("aircraft-player-1"),
    callsign: "P1",
    role: AircraftRole.Player,
    position: createTacticalPosition({
      x: 40,
      y: 12,
      altitudeFeet: 18000,
    }),
    measurements: createTacticalMeasurements({
      speedKnots: 720,
      altitudeFeet: 18000,
      headingDegrees: 34,
      fuelPercentage: 71,
    }),
    lockedTrackId: null,
    countermeasureCount: 3,
    missileInventory: 2,
    isDestroyed: false,
  });
};

export const createRadarTrackFixture = (): RadarTrack => {
  return createRadarTrack({
    trackId: asTrackId("track-enemy-1"),
    sourceAircraftId: asAircraftId("aircraft-player-1"),
    targetAircraftId: asAircraftId("aircraft-enemy-1"),
    status: TrackStatus.Tracking,
    confidencePercentage: 82,
    lastKnownPosition: createTacticalPosition({
      x: 16,
      y: 8,
      altitudeFeet: 17500,
    }),
    ticksSinceLastRefresh: 1,
  });
};