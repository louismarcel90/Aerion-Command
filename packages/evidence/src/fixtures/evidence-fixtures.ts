import type {
  AircraftId,
  CommandId,
  EvidencePackId,
  EventId,
  MissileId,
  TrackId,
} from "@aerion/contracts";
import type { SimulationTick } from "@aerion/contracts";
import {
  MissionCommandType,
  ReasonCode,
  SimulationEventType,
} from "@aerion/contracts";
import {
  createDebriefEventsFixture,
  createDebriefScoreFixture,
  createDebriefSnapshotFixture,
  createDebriefTimelineFixture,
  buildMissionDebriefSummary,
} from "@aerion/decision-rules";
import { trainingScenario } from "@aerion/scenario-kit";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

export const asEvidencePackId = (value: string): EvidencePackId => {
  return value as EvidencePackId;
};

export const asEventId = (value: string): EventId => {
  return value as EventId;
};

export const asMissileId = (value: string): MissileId => {
  return value as MissileId;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createEvidenceCommandsFixture = () => {
  return [
    {
      commandId: asCommandId("command-001"),
      issuedAtTick: asSimulationTick(1),      
      aircraftId: asAircraftId("aircraft-player-1"),
      type: MissionCommandType.IncreaseSpeed,
    },
    {
      commandId: asCommandId("command-002"),
      issuedAtTick: asSimulationTick(2),
      aircraftId: asAircraftId("aircraft-player-1"),
      type: MissionCommandType.AttemptLock,
      targetTrackId: asTrackId("track-enemy-1"),
    },
  ] as const;
};

export const createEvidenceEventsFixture = () => {
  return [
    ...createDebriefEventsFixture(),
    {
      eventId: asEventId("event-evidence-launch-authorized"),
      missionId: createDebriefSnapshotFixture().missionId,
      occurredAtTick: asSimulationTick(6),
      type: SimulationEventType.WeaponLaunchAuthorized,
      aircraftId: asAircraftId("aircraft-player-1"),
      trackId: asTrackId("track-enemy-1"),
      reasonCode: ReasonCode.LaunchAuthorized,
    },
  ] as const;
};

export const createEvidenceDebriefSummaryFixture = () => {
  return buildMissionDebriefSummary({
    finalSnapshot: createDebriefSnapshotFixture(),
    score: createDebriefScoreFixture(),
    timelineEntries: createDebriefTimelineFixture(),
    events: createEvidenceEventsFixture(),
    missionOutcome: {
      status: "SUCCEEDED",
      reasonCodes: [ReasonCode.MissionSucceededObjectiveComplete],
    },
  });
};

export const createEvidenceFixtureInput = () => {
  return {
    evidencePackId: asEvidencePackId("evidence-pack-001"),
    scenario: trainingScenario,
    finalSnapshot: createDebriefSnapshotFixture(),
    commands: createEvidenceCommandsFixture(),
    events: createEvidenceEventsFixture(),
    debriefSummary: createEvidenceDebriefSummaryFixture(),
    replayVerificationStamp: null,
    generatedAtIso: "2026-04-30T00:00:00.000Z",
  };
};