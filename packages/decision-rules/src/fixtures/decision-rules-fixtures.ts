import type {
  AircraftId,
  CommandId,
  Digest,
  EventId,
  MissileId,
  MissionId,
  ScenarioId,
  SimulationEvent,
  SimulationSeed,
  AuthoritativeSnapshot,
  SimulationTick,
  TrackId,
} from "@aerion/contracts";
import{
  MissionPhase,
  MissionStatus,
  ReasonCode,
  SimulationEventType,
} from "@aerion/contracts";
import type { MissionScore, MissionTimelineEntry } from "@aerion/mission-engine";

export const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

export const asEventId = (value: string): EventId => {
  return value as EventId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asScenarioId = (value: string): ScenarioId => {
  return value as ScenarioId;
};

export const asSimulationSeed = (value: number): SimulationSeed => {
  return value as SimulationSeed;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asDigest = (value: string): Digest => {
  return value as Digest;
};

export const asMissileId = (value: string): MissileId => {
  return value as MissileId;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const createDebriefScoreFixture = (): MissionScore => {
  return {
    totalScore: 780,
    objectiveScore: 250,
    survivalScore: 300,
    efficiencyScore: 230,
    reasonCode: ReasonCode.MissionScoreComputed,
  };
};

export const createDebriefSnapshotFixture = (): AuthoritativeSnapshot => {
  return {
    missionId: asMissionId("mission-001"),
    scenarioId: asScenarioId("scenario-first-contact"),
    seed: asSimulationSeed(42),
    tick: asSimulationTick(12),
    missionStatus: MissionStatus.Succeeded,
    missionPhase: MissionPhase.Egress,
    aircraft: [],
    snapshotDigest: "digest-final" as AuthoritativeSnapshot["snapshotDigest"],
  };
};

export const createDebriefTimelineFixture = (): readonly MissionTimelineEntry[] => {
  return [
    {
      tick: asSimulationTick(1),
      label: "Mission phase updated.",
      reasonCode: ReasonCode.MissionStarted,
    },
    {
      tick: asSimulationTick(8),
      label: "Objective updated: Intercept hostile aircraft",
      reasonCode: ReasonCode.MissionObjectiveCompletedIntercept,
    },
  ];
};

export const createDebriefEventsFixture = (): readonly SimulationEvent[] => {
  return [
    {
      eventId: asEventId("event-launch-refused-1"),
      missionId: asMissionId("mission-001"),
      occurredAtTick: asSimulationTick(4),
      type: SimulationEventType.WeaponLaunchRejected,
      aircraftId: asAircraftId("aircraft-player-1"),
      trackId: asTrackId("track-enemy-1"),
      reasonCode: ReasonCode.LaunchRefusedOutsideEnvelope,
    },
    {
      eventId: asEventId("event-hit-1"),
      missionId: asMissionId("mission-001"),
      occurredAtTick: asSimulationTick(8),
      type: SimulationEventType.MissileResolved,
      missileId: asMissileId("missile-1"),
      targetTrackId: asTrackId("track-enemy-1"),
      reasonCode: ReasonCode.MissileHitConfirmed,
    },
  ];
};