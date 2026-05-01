import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { MissionId, SimulationEvent, SimulationTick } from "@aerion/contracts";
import type { RadarTrack } from "@aerion/domain";
import { TrackStatus } from "@aerion/domain";
import { buildRuntimeEventId } from "./runtime-event-id.js";

export const buildRadarTrackEvents = (
  missionId: MissionId,
  tick: SimulationTick,
  previousTracks: readonly RadarTrack[],
  nextTracks: readonly RadarTrack[],
): readonly SimulationEvent[] => {
  const detectedEvents = nextTracks
    .filter(
      (track) =>
        previousTracks.find((previous) => previous.trackId === track.trackId) === undefined,
    )
    .map((track, index) => ({
      eventId: buildRuntimeEventId("radar-track-detected", tick, index),
      missionId,
      occurredAtTick: tick,
      type: SimulationEventType.RadarTrackDetected,
      aircraftId: track.sourceAircraftId,
      trackId: track.trackId,
      reasonCode: ReasonCode.RadarTrackDetected,
    }));

  const lockEvents = nextTracks
    .filter((track) => track.status === TrackStatus.Locked)
    .filter((track) => {
      const previousTrack = previousTracks.find(
        (previous) => previous.trackId === track.trackId,
      );

      return previousTrack?.status !== TrackStatus.Locked;
    })
    .map((track, index) => ({
      eventId: buildRuntimeEventId("radar-lock-acquired", tick, index),
      missionId,
      occurredAtTick: tick,
      type: SimulationEventType.RadarLockAcquired,
      aircraftId: track.sourceAircraftId,
      trackId: track.trackId,
      reasonCode: ReasonCode.LockAcquired,
    }));

  return [...detectedEvents, ...lockEvents];
};