import type { AircraftId } from "@aerion/contracts";
import {
  AircraftRole,
  createAircraft,
  createRadarTrack,
  createTacticalMeasurements,
  createTacticalPosition,
  TrackStatus,
} from "@aerion/domain";
import type { Aircraft, RadarTrack } from "@aerion/domain";
import type { ThreatBehaviorState } from "../behavior/threat-behavior-state.js";
import { ThreatBehaviorMode } from "../behavior/threat-behavior-state.js";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const createThreatAircraftFixture = (): Aircraft => {
  return createAircraft({
    aircraftId: asAircraftId("aircraft-threat-1"),
    callsign: "E1",
    role: AircraftRole.Enemy,
    position: createTacticalPosition({
      x: 24,
      y: 8,
      altitudeFeet: 17000,
    }),
    measurements: createTacticalMeasurements({
      speedKnots: 620,
      altitudeFeet: 17000,
      headingDegrees: 180,
      fuelPercentage: 74,
    }),
    lockedTrackId: null,
    countermeasureCount: 2,
    missileInventory: 2,
    isDestroyed: false,
  });
};

export const createOpponentTrackFixture = (): RadarTrack => {
  return createRadarTrack({
    trackId: "track-threat-to-player-1" as RadarTrack["trackId"],
    sourceAircraftId: asAircraftId("aircraft-threat-1"),
    targetAircraftId: asAircraftId("aircraft-player-1"),
    status: TrackStatus.Tracking,
    confidencePercentage: 76,
    lastKnownPosition: createTacticalPosition({
      x: 40,
      y: 12,
      altitudeFeet: 18000,
    }),
    ticksSinceLastRefresh: 0,
  });
};

export const createInitialThreatBehaviorStateFixture = (): ThreatBehaviorState => {
  return {
    aircraftId: asAircraftId("aircraft-threat-1"),
    mode: ThreatBehaviorMode.Patrol,
    selectedTargetTrackId: null,
    aggressionScore: 35,
    confidenceScore: 55,
    ticksInMode: 0,
  };
};

export const createLowFuelThreatAircraftFixture = (): Aircraft => {
  const aircraft = createThreatAircraftFixture();

  return createAircraft({
    ...aircraft,
    measurements: createTacticalMeasurements({
      ...aircraft.measurements,
      fuelPercentage: 8,
    }),
  });
};