import type { AircraftId, CommandId, SimulationTick, TrackId } from "../shared/branded-types.js";

export const MissionCommandType = {
  IncreaseSpeed: "INCREASE_SPEED",
  DecreaseSpeed: "DECREASE_SPEED",
  TurnLeft: "TURN_LEFT",
  TurnRight: "TURN_RIGHT",
  Climb: "CLIMB",
  Descend: "DESCEND",
  CycleRadarTarget: "CYCLE_RADAR_TARGET",
  AttemptLock: "ATTEMPT_LOCK",
  FireWeapon: "FIRE_WEAPON",
  DeployCountermeasure: "DEPLOY_COUNTERMEASURE",
  PauseMission: "PAUSE_MISSION",
  ResumeMission: "RESUME_MISSION",
  ToggleTacticalOverlay: "TOGGLE_TACTICAL_OVERLAY",
  ExpandEventPanel: "EXPAND_EVENT_PANEL",
} as const;

export type MissionCommandType = (typeof MissionCommandType)[keyof typeof MissionCommandType];

export type BaseMissionCommand = {
  readonly commandId: CommandId;
  readonly issuedAtTick: SimulationTick;
  readonly aircraftId: AircraftId;
};

export type DirectionalMissionCommand = BaseMissionCommand & {
  readonly type:
    | typeof MissionCommandType.IncreaseSpeed
    | typeof MissionCommandType.DecreaseSpeed
    | typeof MissionCommandType.TurnLeft
    | typeof MissionCommandType.TurnRight
    | typeof MissionCommandType.Climb
    | typeof MissionCommandType.Descend;
};

export type SensorMissionCommand = BaseMissionCommand & {
  readonly type:
    | typeof MissionCommandType.CycleRadarTarget
    | typeof MissionCommandType.AttemptLock;
  readonly targetTrackId?: TrackId;
};

export type WeaponMissionCommand = BaseMissionCommand & {
  readonly type:
    | typeof MissionCommandType.FireWeapon
    | typeof MissionCommandType.DeployCountermeasure;
  readonly targetTrackId?: TrackId;
};

export type ControlMissionCommand = BaseMissionCommand & {
  readonly type:
    | typeof MissionCommandType.PauseMission
    | typeof MissionCommandType.ResumeMission
    | typeof MissionCommandType.ToggleTacticalOverlay
    | typeof MissionCommandType.ExpandEventPanel;
};

export type MissionCommand =
  | DirectionalMissionCommand
  | SensorMissionCommand
  | WeaponMissionCommand
  | ControlMissionCommand;