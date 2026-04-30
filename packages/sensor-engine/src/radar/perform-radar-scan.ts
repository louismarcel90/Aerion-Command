import { ReasonCode } from "@aerion/contracts";
import type { TrackId } from "@aerion/contracts";
import type { Aircraft, RadarTrack } from "@aerion/domain";
import { createRadarTrack, TrackStatus } from "@aerion/domain";
import { defaultRadarScanConfiguration } from "./radar-scan-configuration.js";
import type { RadarScanConfiguration } from "./radar-scan-configuration.js";
import type { RadarScanResult } from "./radar-scan-result.js";
import { evaluateRadarGeometry } from "./radar-geometry.js";

export const performRadarScan = (
  sourceAircraft: Aircraft,
  candidateTargets: readonly Aircraft[],
  existingTracks: readonly RadarTrack[],
  configuration: RadarScanConfiguration = defaultRadarScanConfiguration,
): RadarScanResult => {
  const detectedTracks = candidateTargets
    .filter((target) => target.aircraftId !== sourceAircraft.aircraftId)
    .filter((target) => !target.isDestroyed)
    .map((target) => buildTrackForTarget(sourceAircraft, target, existingTracks, configuration))
    .filter((track): track is RadarTrack => track !== null);

  const refreshedTrackIds = new Set(detectedTracks.map((track) => track.trackId));
  const staleTracks = existingTracks
    .filter((track) => track.sourceAircraftId === sourceAircraft.aircraftId)
    .filter((track) => !refreshedTrackIds.has(track.trackId))
    .map((track) => decayTrack(track, configuration))
    .filter((track) => track.status !== TrackStatus.Lost);

  return {
    tracks: [...detectedTracks, ...staleTracks],
    reasonCodes: detectedTracks.length > 0 ? [ReasonCode.RadarTrackDetected] : [],
  };
};

const buildTrackForTarget = (
  sourceAircraft: Aircraft,
  targetAircraft: Aircraft,
  existingTracks: readonly RadarTrack[],
  configuration: RadarScanConfiguration,
): RadarTrack | null => {
  const geometry = evaluateRadarGeometry(
    sourceAircraft,
    targetAircraft,
    configuration.maxDetectionRangeUnits,
    configuration.sensorArcDegrees,
  );

  if (!geometry.insideRange || !geometry.insideSensorArc) {
    return null;
  }

  const existingTrack = existingTracks.find(
    (track) =>
      track.sourceAircraftId === sourceAircraft.aircraftId &&
      track.targetAircraftId === targetAircraft.aircraftId,
  );

  const confidencePercentage = Math.min(
    100,
    (existingTrack?.confidencePercentage ?? configuration.baseDetectionConfidence) +
      configuration.confidenceGainPerScan,
  );

  return createRadarTrack({
    trackId: createTrackId(sourceAircraft, targetAircraft),
    sourceAircraftId: sourceAircraft.aircraftId,
    targetAircraftId: targetAircraft.aircraftId,
    status: confidencePercentage >= 70 ? TrackStatus.Tracking : TrackStatus.Detected,
    confidencePercentage,
    lastKnownPosition: targetAircraft.position,
    ticksSinceLastRefresh: 0,
  });
};

const decayTrack = (
  track: RadarTrack,
  configuration: RadarScanConfiguration,
): RadarTrack => {
  const nextTicksSinceLastRefresh = track.ticksSinceLastRefresh + 1;
  const nextConfidence = Math.max(
    0,
    track.confidencePercentage - configuration.confidenceLossWhenStale,
  );

  const status =
    nextTicksSinceLastRefresh >= configuration.lostAfterTicks
      ? TrackStatus.Lost
      : nextTicksSinceLastRefresh >= configuration.staleAfterTicks
        ? TrackStatus.Stale
        : track.status;

  return createRadarTrack({
    ...track,
    status,
    confidencePercentage: nextConfidence,
    ticksSinceLastRefresh: nextTicksSinceLastRefresh,
  });
};

const createTrackId = (sourceAircraft: Aircraft, targetAircraft: Aircraft): TrackId => {
  return `track-${sourceAircraft.aircraftId}-${targetAircraft.aircraftId}` as TrackId;
};