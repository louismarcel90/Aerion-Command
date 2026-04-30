import type { AircraftId, TrackId } from "@aerion/contracts";
import {
  AircraftRole,
  createAircraft,
  createPlayerAircraftFixture,
  createRadarTrack,
  createTacticalMeasurements,
  createTacticalPosition,
  TrackStatus,
} from "@aerion/domain";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const createEnemyAircraftFixture = () => {
  return createAircraft({
    aircraftId: asAircraftId("aircraft-enemy-1"),
    callsign: "E1",
    role: AircraftRole.Enemy,
    position: createTacticalPosition({
      x: 40,
      y: 2,
      altitudeFeet: 17500,
    }),
    measurements: createTacticalMeasurements({
      speedKnots: 680,
      altitudeFeet: 17500,
      headingDegrees: 180,
      fuelPercentage: 80,
    }),
    lockedTrackId: null,
    countermeasureCount: 2,
    missileInventory: 2,
    isDestroyed: false,
  });
};

export const createPlayerFacingEnemyFixture = () => {
  const player = createPlayerAircraftFixture();

  return createAircraft({
    ...player,
    position: createTacticalPosition({
      x: 40,
      y: 12,
      altitudeFeet: 18000,
    }),
    measurements: createTacticalMeasurements({
      ...player.measurements,
      headingDegrees: 0,
    }),
  });
};

export const createStableTrackFixture = () => {
  const player = createPlayerFacingEnemyFixture();
  const enemy = createEnemyAircraftFixture();

  return createRadarTrack({
    trackId: asTrackId(`track-${player.aircraftId}-${enemy.aircraftId}`),
    sourceAircraftId: player.aircraftId,
    targetAircraftId: enemy.aircraftId,
    status: TrackStatus.Tracking,
    confidencePercentage: 88,
    lastKnownPosition: enemy.position,
    ticksSinceLastRefresh: 0,
  });
};