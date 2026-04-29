export const FaultCode = {
  RadarDegraded: "RADAR_DEGRADED",
  RadarBlackout: "RADAR_BLACKOUT",
  RwrIntermittent: "RWR_INTERMITTENT",
  TrackConfidenceCollapse: "TRACK_CONFIDENCE_COLLAPSE",
  CommandDropped: "COMMAND_DROPPED",
  CommandDelayed: "COMMAND_DELAYED",
  EventProcessingDelayed: "EVENT_PROCESSING_DELAYED",
  ReplayChecksumMismatchInjected: "REPLAY_CHECKSUM_MISMATCH_INJECTED",
  HudPartial: "HUD_PARTIAL",
} as const;

export type FaultCode = (typeof FaultCode)[keyof typeof FaultCode];