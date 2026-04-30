export const ReasonCode = {
  MissionStarted: "MISSION_STARTED",
  MissionSucceededObjectiveComplete: "MISSION_SUCCEEDED_OBJECTIVE_COMPLETE",
  MissionFailedPlayerDestroyed: "MISSION_FAILED_PLAYER_DESTROYED",
  MissionFailedEscortDestroyed: "MISSION_FAILED_ESCORT_DESTROYED",
  MissionFailedFuelExhausted: "MISSION_FAILED_FUEL_EXHAUSTED",

  CommandAccepted: "COMMAND_ACCEPTED",
  CommandRejectedMissionTerminated: "COMMAND_REJECTED_MISSION_TERMINATED",
  CommandRejectedReplayModeReadOnly: "COMMAND_REJECTED_REPLAY_MODE_READ_ONLY",
  CommandRejectedActionCooldownActive: "COMMAND_REJECTED_ACTION_COOLDOWN_ACTIVE",

  RadarTrackDetected: "RADAR_TRACK_DETECTED",
  
  LockAcquired: "LOCK_ACQUIRED",
  LockFailedOutsideSensorArc: "LOCK_FAILED_OUTSIDE_SENSOR_ARC",
  LockFailedConfidenceTooLow: "LOCK_FAILED_CONFIDENCE_TOO_LOW",
  LockDroppedSignalDegraded: "LOCK_DROPPED_SIGNAL_DEGRADED",

  LaunchAuthorized: "LAUNCH_AUTHORIZED",
  LaunchRefusedNoStableLock: "LAUNCH_REFUSED_NO_STABLE_LOCK",
  LaunchRefusedOutsideEnvelope: "LAUNCH_REFUSED_OUTSIDE_ENVELOPE",
  LaunchRefusedWeaponCooldownActive: "LAUNCH_REFUSED_WEAPON_COOLDOWN_ACTIVE",
  LaunchRefusedNoInventory: "LAUNCH_REFUSED_NO_INVENTORY",

  MissileHitConfirmed: "MISSILE_HIT_CONFIRMED",
  MissileMissedTargetEvasiveWindow: "MISSILE_MISSED_TARGET_EVASIVE_WINDOW",
  MissileMissedCountermeasureEffective: "MISSILE_MISSED_COUNTERMEASURE_EFFECTIVE",

  ReplayVerified: "REPLAY_VERIFIED",
  ReplayDriftDetected: "REPLAY_DRIFT_DETECTED",
  ReplayChecksumMismatch: "REPLAY_CHECKSUM_MISMATCH",
} as const;

export type ReasonCode = (typeof ReasonCode)[keyof typeof ReasonCode];