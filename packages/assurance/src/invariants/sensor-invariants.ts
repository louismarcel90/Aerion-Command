import { ReasonCode } from "@aerion/contracts";
import { TrackStatus } from "@aerion/domain";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import { AssuranceSeverity } from "./assurance-invariant.js";
import type { AssuranceInvariantResult } from "./assurance-invariant.js";

export const verifyStaleTrackConfidenceInvariant = (
  state: AuthoritativeSimulationState,
): AssuranceInvariantResult => {
  const invalidTrack = state.radarTracks.find(
    (track) => track.status === TrackStatus.Stale && track.confidencePercentage >= 70,
  );

  const passed = invalidTrack === undefined;

  return {
    invariantName: "STALE_TRACK_CONFIDENCE_MUST_BE_LIMITED",
    passed,
    severity: passed ? AssuranceSeverity.Info : AssuranceSeverity.Warning,
    message: passed
      ? "Stale track confidence invariant passed."
      : "Stale track cannot retain high confidence.",
    reasonCode: passed ? null : ReasonCode.LockDroppedSignalDegraded,
  };
};

export const verifyLockRequiresStableTrackInvariant = (
  state: AuthoritativeSimulationState,
): AssuranceInvariantResult => {
  const invalidAircraft = state.aircraft.find((aircraft) => {
    if (aircraft.lockedTrackId === null) {
      return false;
    }

    const lockedTrack = state.radarTracks.find((track) => track.trackId === aircraft.lockedTrackId);

    return (
      lockedTrack === undefined ||
      lockedTrack.status !== TrackStatus.Locked ||
      lockedTrack.confidencePercentage < 70
    );
  });

  const passed = invalidAircraft === undefined;

  return {
    invariantName: "AIRCRAFT_LOCK_REQUIRES_STABLE_LOCKED_TRACK",
    passed,
    severity: passed ? AssuranceSeverity.Info : AssuranceSeverity.Critical,
    message: passed
      ? "Aircraft lock invariant passed."
      : "Aircraft cannot hold lock on missing, unstable, or unlocked track.",
    reasonCode: passed ? null : ReasonCode.LockFailedConfidenceTooLow,
  };
};