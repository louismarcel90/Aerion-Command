import { ReasonCode } from "@aerion/contracts";
import type { Aircraft, RadarTrack } from "@aerion/domain";
import { TrackStatus } from "@aerion/domain";
import { RwrAlertLevel } from "./rwr-alert.js";
import type { RwrAlert } from "./rwr-alert.js";

export const evaluateRwrAlerts = (
  aircraft: Aircraft,
  hostileTracks: readonly RadarTrack[],
): readonly RwrAlert[] => {
  const lockAgainstAircraft = hostileTracks.find(
    (track) =>
      track.targetAircraftId === aircraft.aircraftId &&
      track.status === TrackStatus.Locked,
  );

  if (lockAgainstAircraft) {
    return [
      {
        aircraftId: aircraft.aircraftId,
        level: RwrAlertLevel.Spike,
        label: "RWR SPIKE",
        reasonCode: ReasonCode.LockAcquired,
      },
    ];
  }

  const trackingAgainstAircraft = hostileTracks.find(
    (track) =>
      track.targetAircraftId === aircraft.aircraftId &&
      track.status === TrackStatus.Tracking,
  );

  if (trackingAgainstAircraft) {
    return [
      {
        aircraftId: aircraft.aircraftId,
        level: RwrAlertLevel.Tracking,
        label: "RWR TRACKING",
        reasonCode: ReasonCode.LockAcquired,
      },
    ];
  }

  return [];
};