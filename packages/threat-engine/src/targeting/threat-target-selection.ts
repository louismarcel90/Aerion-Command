import type { RadarTrack } from "@aerion/domain";
import { TrackStatus } from "@aerion/domain";

export type ThreatTargetSelection = {
  readonly selectedTrack: RadarTrack | null;
};

export const selectHighestConfidenceTarget = (
  tracks: readonly RadarTrack[],
): ThreatTargetSelection => {
  const eligibleTracks = tracks.filter(
    (track) => track.status === TrackStatus.Tracking || track.status === TrackStatus.Locked,
  );

  const selectedTrack = [...eligibleTracks].sort(
    (left, right) =>
      right.confidencePercentage - left.confidencePercentage ||
      left.trackId.localeCompare(right.trackId),
  )[0];

  return {
    selectedTrack: selectedTrack ?? null,
  };
};