import type { FaultCode } from "@aerion/contracts";

export const DegradedCapability = {
  RadarTracking: "RADAR_TRACKING",
  RadarLock: "RADAR_LOCK",
  RwrWarning: "RWR_WARNING",
  HudFullDisplay: "HUD_FULL_DISPLAY",
  ReplayVerification: "REPLAY_VERIFICATION",
} as const;

export type DegradedCapability =
  (typeof DegradedCapability)[keyof typeof DegradedCapability];

export type DegradedModePolicy = {
  readonly activeFaultCodes: readonly FaultCode[];
  readonly unavailableCapabilities: readonly DegradedCapability[];
  readonly degradedCapabilities: readonly DegradedCapability[];
  readonly operatorMessage: string;
};