import type { Aircraft, EngagementWindow, RadarTrack } from "@aerion/domain";
import {
  AircraftRole,
  createAircraft,
  createEngagementWindow,
  createTacticalMeasurements,
  TrackStatus,
} from "@aerion/domain";
import { evaluateRadarGeometry } from "@aerion/sensor-engine";
import type { WeaponEnvelopeConfiguration } from "./weapon-envelope-configuration.js";
import { defaultWeaponEnvelopeConfiguration } from "./weapon-envelope-configuration.js";

export const evaluateLaunchEnvelope = (
  sourceAircraft: Aircraft,
  targetTrack: RadarTrack,
  configuration: WeaponEnvelopeConfiguration = defaultWeaponEnvelopeConfiguration,
): EngagementWindow => {
  const syntheticTargetAircraft = createAircraft({
    aircraftId: targetTrack.targetAircraftId,
    callsign: "TRACK",
    role: AircraftRole.Enemy,
    position: targetTrack.lastKnownPosition,
    measurements: createTacticalMeasurements({
      speedKnots: 0,
      altitudeFeet: targetTrack.lastKnownPosition.altitudeFeet,
      headingDegrees: 0,
      fuelPercentage: 100,
    }),
    lockedTrackId: null,
    countermeasureCount: 0,
    missileInventory: 0,
    isDestroyed: false,
  });

  const geometry = evaluateRadarGeometry(
    sourceAircraft,
    syntheticTargetAircraft,
    configuration.maxLaunchRangeUnits,
    configuration.maxAngleOffNoseDegrees * 2,
  );

  const isInsideRange =
    geometry.distanceUnits >= configuration.minLaunchRangeUnits &&
    geometry.distanceUnits <= configuration.maxLaunchRangeUnits;

  const isInsideAngle = geometry.angleOffNoseDegrees <= configuration.maxAngleOffNoseDegrees;

  const isLockStable =
    targetTrack.status === TrackStatus.Locked &&
    targetTrack.confidencePercentage >= configuration.requiredConfidencePercentage;

  return createEngagementWindow({
    sourceAircraftId: sourceAircraft.aircraftId,
    targetTrackId: targetTrack.trackId,
    distanceUnits: geometry.distanceUnits,
    angleOffNoseDegrees: geometry.angleOffNoseDegrees,
    isInsideLaunchEnvelope: isInsideRange && isInsideAngle,
    isLockStable,
  });
};