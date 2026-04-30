import { ReasonCode } from "@aerion/contracts";
import type { TrackId } from "@aerion/contracts";
import type { Aircraft, RadarTrack } from "@aerion/domain";
import { createAircraft, createRadarTrack, TrackStatus } from "@aerion/domain";
import { classifyTrackConfidence, TrackConfidenceState } from "../confidence/track-confidence-state.js";
import { defaultRadarScanConfiguration } from "../radar/radar-scan-configuration.js";
import type { RadarScanConfiguration } from "../radar/radar-scan-configuration.js";
import type { LockAttemptResult } from "./lock-attempt-result.js";

export const attemptRadarLock = (
  sourceAircraft: Aircraft,
  tracks: readonly RadarTrack[],
  targetTrackId: TrackId,
  configuration: RadarScanConfiguration = defaultRadarScanConfiguration,
): LockAttemptResult => {
  const track = tracks.find(
    (candidateTrack) =>
      candidateTrack.trackId === targetTrackId &&
      candidateTrack.sourceAircraftId === sourceAircraft.aircraftId,
  );

  if (!track) {
    return {
      aircraft: sourceAircraft,
      track: null,
      acquired: false,
      reasonCode: ReasonCode.LockFailedConfidenceTooLow,
    };
  }

  if (track.ticksSinceLastRefresh >= configuration.staleAfterTicks || track.status === TrackStatus.Stale) {
    return {
      aircraft: createAircraft({
        ...sourceAircraft,
        lockedTrackId: null,
      }),
      track,
      acquired: false,
      reasonCode: ReasonCode.LockDroppedSignalDegraded,
    };
  }

  const confidenceState = classifyTrackConfidence(track.confidencePercentage);

  if (confidenceState !== TrackConfidenceState.Stable && confidenceState !== TrackConfidenceState.High) {
    return {
      aircraft: sourceAircraft,
      track,
      acquired: false,
      reasonCode: ReasonCode.LockFailedConfidenceTooLow,
    };
  }

  const lockedTrack = createRadarTrack({
    ...track,
    status: TrackStatus.Locked,
  });

  return {
    aircraft: createAircraft({
      ...sourceAircraft,
      lockedTrackId: targetTrackId,
    }),
    track: lockedTrack,
    acquired: true,
    reasonCode: ReasonCode.LockAcquired,
  };
};