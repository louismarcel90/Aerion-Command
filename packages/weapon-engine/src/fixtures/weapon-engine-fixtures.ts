import type { MissileId, SimulationTick } from "@aerion/contracts";
import {
  createPlayerFacingEnemyFixture,
  createStableTrackFixture,
} from "@aerion/sensor-engine";
import type { Aircraft, RadarTrack } from "@aerion/domain";
import { createAircraft, createRadarTrack, TrackStatus } from "@aerion/domain";

export const asMissileId = (value: string): MissileId => {
  return value as MissileId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createWeaponReadyAircraftFixture = (): Aircraft => {
  const aircraft = createPlayerFacingEnemyFixture();

  return createAircraft({
    ...aircraft,
    missileInventory: 2,
  });
};

export const createLockedTrackFixture = (): RadarTrack => {
  const track = createStableTrackFixture();

  return createRadarTrack({
    ...track,
    status: TrackStatus.Locked,
    confidencePercentage: 92,
  });
};

export const createLowConfidenceTrackFixture = (): RadarTrack => {
  const track = createStableTrackFixture();

  return createRadarTrack({
    ...track,
    status: TrackStatus.Tracking,
    confidencePercentage: 35,
  });
};