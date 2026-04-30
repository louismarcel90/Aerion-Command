export const ExecutionStage = {
  Commands: "COMMANDS",
  FlightModel: "FLIGHT_MODEL",
  SensorModel: "SENSOR_MODEL",
  WeaponModel: "WEAPON_MODEL",
  ThreatModel: "THREAT_MODEL",
  MissionModel: "MISSION_MODEL",
  InvariantChecks: "INVARIANT_CHECKS",
  EventEmission: "EVENT_EMISSION",
  RenderProjection: "RENDER_PROJECTION",
} as const;

export type ExecutionStage = (typeof ExecutionStage)[keyof typeof ExecutionStage];

export const deterministicExecutionOrder: readonly ExecutionStage[] = [
  ExecutionStage.Commands,
  ExecutionStage.FlightModel,
  ExecutionStage.SensorModel,
  ExecutionStage.WeaponModel,
  ExecutionStage.ThreatModel,
  ExecutionStage.MissionModel,
  ExecutionStage.InvariantChecks,
  ExecutionStage.EventEmission,
  ExecutionStage.RenderProjection,
];