export const ReplayVerificationStatus = {
  Verified: "VERIFIED",
  DriftDetected: "DRIFT_DETECTED",
  ChecksumMismatch: "CHECKSUM_MISMATCH",
  NotReplayed: "NOT_REPLAYED",
} as const;

export type ReplayVerificationStatus =
  (typeof ReplayVerificationStatus)[keyof typeof ReplayVerificationStatus];