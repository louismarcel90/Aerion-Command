export const FailureCategory = {
  SensorFailure: "SENSOR_FAILURE",
  CommandPathFailure: "COMMAND_PATH_FAILURE",
  EventTimingAnomaly: "EVENT_TIMING_ANOMALY",
  ReplayFailure: "REPLAY_FAILURE",
  RenderDegradation: "RENDER_DEGRADATION",
  StateIntegrityFailure: "STATE_INTEGRITY_FAILURE",
} as const;

export type FailureCategory = (typeof FailureCategory)[keyof typeof FailureCategory];