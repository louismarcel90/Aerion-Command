import type {
  AircraftId,
  CommandId,
  EventId,
  MissionId,
  MissileId,
  SimulationTick,
  TrackId,
} from "../shared/branded-types.js";
import type { FaultCode } from "../faults/fault-code.js";
import type { MissionPhase } from "../mission/mission-phase.js";
import type { MissionStatus } from "../mission/mission-status.js";
import type { ReasonCode } from "../reasons/reason-code.js";
import type { ReplayVerificationStatus } from "../replay/replay-verification-status.js";

export const SimulationEventType = {
  MissionStatusChanged: "MISSION_STATUS_CHANGED",
  MissionPhaseChanged: "MISSION_PHASE_CHANGED",
  CommandReceived: "COMMAND_RECEIVED",
  CommandRejected: "COMMAND_REJECTED",
  AircraftStateChanged: "AIRCRAFT_STATE_CHANGED",
  RadarTrackDetected: "RADAR_TRACK_DETECTED",
  RadarLockAcquired: "RADAR_LOCK_ACQUIRED",
  RadarLockLost: "RADAR_LOCK_LOST",
  WeaponLaunchAuthorized: "WEAPON_LAUNCH_AUTHORIZED",
  WeaponLaunchRejected: "WEAPON_LAUNCH_REJECTED",
  MissileLaunched: "MISSILE_LAUNCHED",
  MissileResolved: "MISSILE_RESOLVED",
  CountermeasureDeployed: "COUNTERMEASURE_DEPLOYED",
  FaultInjected: "FAULT_INJECTED",
  InvariantViolationDetected: "INVARIANT_VIOLATION_DETECTED",
  ReplayVerificationCompleted: "REPLAY_VERIFICATION_COMPLETED",
} as const;

export type SimulationEventType = (typeof SimulationEventType)[keyof typeof SimulationEventType];

export type BaseSimulationEvent = {
  readonly eventId: EventId;
  readonly missionId: MissionId;
  readonly occurredAtTick: SimulationTick;
  readonly reasonCode: ReasonCode;
};

export type MissionStatusChangedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.MissionStatusChanged;
  readonly previousStatus: MissionStatus;
  readonly nextStatus: MissionStatus;
};

export type MissionPhaseChangedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.MissionPhaseChanged;
  readonly previousPhase: MissionPhase;
  readonly nextPhase: MissionPhase;
};

export type CommandReceivedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.CommandReceived;
  readonly commandId: string;
  readonly reasonCode: ReasonCode;
};

export type CommandRejectedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.CommandRejected;
  readonly commandId: CommandId;
};

export type RadarTrackDetectedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.RadarTrackDetected;
  readonly aircraftId: AircraftId;
  readonly trackId: TrackId;
};

export type RadarLockAcquiredEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.RadarLockAcquired;
  readonly aircraftId: AircraftId;
  readonly trackId: TrackId;
};

export type RadarLockLostEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.RadarLockLost;
  readonly aircraftId: AircraftId;
  readonly trackId: TrackId;
};

export type WeaponLaunchAuthorizedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.WeaponLaunchAuthorized;
  readonly aircraftId: AircraftId;
  readonly trackId: TrackId;
};

export type WeaponLaunchRejectedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.WeaponLaunchRejected;
  readonly aircraftId: AircraftId;
  readonly trackId?: TrackId;
};

export type MissileLaunchedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.MissileLaunched;
  readonly missileId: MissileId;
  readonly sourceAircraftId: AircraftId;
  readonly targetTrackId: TrackId;
};

export type MissileResolvedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.MissileResolved;
  readonly missileId: MissileId;
  readonly targetTrackId: TrackId;
};

export type CountermeasureDeployedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.CountermeasureDeployed;
  readonly aircraftId: AircraftId;
};

export type FaultInjectedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.FaultInjected;
  readonly faultCode: FaultCode;
  readonly reasonCode: ReasonCode;
};

export type InvariantViolationDetectedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.InvariantViolationDetected;
  readonly invariantName: string;
  readonly reasonCode: ReasonCode;
};

export type ReplayVerificationCompletedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.ReplayVerificationCompleted;
  readonly verificationStatus: ReplayVerificationStatus;
};

export type SimulationEvent =
  | MissionStatusChangedEvent
  | MissionPhaseChangedEvent
  | CommandReceivedEvent
  | CommandRejectedEvent
  | RadarTrackDetectedEvent
  | RadarLockAcquiredEvent
  | RadarLockLostEvent
  | WeaponLaunchAuthorizedEvent
  | WeaponLaunchRejectedEvent
  | MissileLaunchedEvent
  | MissileResolvedEvent
  | CountermeasureDeployedEvent
  | FaultInjectedEvent
  | InvariantViolationDetectedEvent
  | ReplayVerificationCompletedEvent;