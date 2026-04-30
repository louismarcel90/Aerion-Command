import type { Aircraft } from "../entities/aircraft.js";
import type { Missile } from "../entities/missile.js";
import { MissileStatus } from "../entities/missile.js";
import type { RadarTrack } from "../entities/radar-track.js";
import { TrackStatus } from "../entities/radar-track.js";

export type DomainInvariantResult = {
  readonly passed: boolean;
  readonly invariantName: string;
  readonly message: string;
};

export const verifyAircraftInventoryInvariant = (aircraft: Aircraft): DomainInvariantResult => {
  const passed = aircraft.countermeasureCount >= 0 && aircraft.missileInventory >= 0;

  return {
    passed,
    invariantName: "AIRCRAFT_INVENTORY_NON_NEGATIVE",
    message: passed
      ? "Aircraft inventory is valid."
      : "Aircraft inventory cannot contain negative values.",
  };
};

export const verifyDestroyedMissileInvariant = (missile: Missile): DomainInvariantResult => {
  const passed =
    missile.status !== MissileStatus.Destroyed || missile.ticksSinceLaunch >= 0;

  return {
    passed,
    invariantName: "DESTROYED_MISSILE_CANNOT_HAVE_INVALID_LIFETIME",
    message: passed
      ? "Destroyed missile lifetime is valid."
      : "Destroyed missile has invalid lifetime state.",
  };
};

export const verifyStaleTrackInvariant = (track: RadarTrack): DomainInvariantResult => {
  const passed = track.status !== TrackStatus.Stale || track.confidencePercentage < 70;

  return {
    passed,
    invariantName: "STALE_TRACK_CONFIDENCE_MUST_BE_LIMITED",
    message: passed
      ? "Stale track confidence is within expected bounds."
      : "Stale track cannot retain high confidence.",
  };
};