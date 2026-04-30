import { FaultCode } from "@aerion/contracts";
import type { RadarTrack } from "@aerion/domain";
import { createRadarTrack, TrackStatus } from "@aerion/domain";
import { SensorDegradationLevel } from "./sensor-degradation-state.js";
import type { SensorDegradationState } from "./sensor-degradation-state.js";

export const applySensorDegradation = (
  tracks: readonly RadarTrack[],
  degradationState: SensorDegradationState,
): readonly RadarTrack[] => {
  if (degradationState.level === SensorDegradationLevel.Nominal) {
    return tracks;
  }

  if (degradationState.level === SensorDegradationLevel.Blackout) {
    return tracks.map((track) =>
      createRadarTrack({
        ...track,
        status: TrackStatus.Lost,
        confidencePercentage: 0,
        ticksSinceLastRefresh: track.ticksSinceLastRefresh + 1,
      }),
    );
  }

  const confidencePenalty = degradationState.activeFaultCodes.includes(FaultCode.RadarDegraded)
    ? 35
    : 20;

  return tracks.map((track) =>
    createRadarTrack({
      ...track,
      status: track.status === TrackStatus.Locked ? TrackStatus.Tracking : track.status,
      confidencePercentage: Math.max(0, track.confidencePercentage - confidencePenalty),
      ticksSinceLastRefresh: track.ticksSinceLastRefresh + 1,
    }),
  );
};