import { describe, expect, it } from "vitest";
import {
  addReplayCheckpoint,
  applyReplayVerification,
  asDigest,
  asEventId,
  asSimulationTick,
  buildReplayTimeline,
  createReplayCheckpointStore,
  createReplayEventHistory,
  createReplayMissionStartedEventFixture,
  createReplaySession,
  detectReplayDrift,
  eventsAtReplayTick,
  findLatestCheckpointAtOrBeforeTick,
  ReplayMode,
  stepReplaySessionBackward,
  stepReplaySessionForward,
  toggleReplaySessionPlayback,
  verifyReplayDigest,
} from "./index.js";
import type { MissionId, ScenarioId, SimulationSeed } from "@aerion/contracts";
import { MissionPhase, MissionStatus, ReplayVerificationStatus } from "@aerion/contracts";

const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

const asScenarioId = (value: string): ScenarioId => {
  return value as ScenarioId;
};

const asSimulationSeed = (value: number): SimulationSeed => {
  return value as SimulationSeed;
};

describe("replay event history", () => {
  it("orders replay events deterministically", () => {
    const lateEvent = createReplayMissionStartedEventFixture(
      asEventId("event-b"),
      asSimulationTick(3),
    );

    const earlyEvent = createReplayMissionStartedEventFixture(
      asEventId("event-a"),
      asSimulationTick(1),
    );

    const history = createReplayEventHistory([lateEvent, earlyEvent]);

    expect(history.events.map((event) => event.eventId)).toEqual(["event-a", "event-b"]);
  });

  it("returns events at replay tick", () => {
    const event = createReplayMissionStartedEventFixture(
      asEventId("event-a"),
      asSimulationTick(2),
    );

    const history = createReplayEventHistory([event]);

    expect(eventsAtReplayTick(history, 2)).toHaveLength(1);
    expect(eventsAtReplayTick(history, 3)).toHaveLength(0);
  });
});

describe("replay timeline", () => {
  it("builds replay timeline entries from events", () => {
    const event = createReplayMissionStartedEventFixture(
      asEventId("event-a"),
      asSimulationTick(2),
    );

    const timeline = buildReplayTimeline([event]);

    expect(timeline).toHaveLength(1);
    expect(timeline[0]?.tick).toBe(2);
    expect(timeline[0]?.reasonCode).toBe(event.reasonCode);
  });
});

describe("replay session", () => {
  it("creates paused replay session", () => {
    const event = createReplayMissionStartedEventFixture(
      asEventId("event-a"),
      asSimulationTick(1),
    );

    const session = createReplaySession([event], asSimulationTick(0));

    expect(session.mode).toBe(ReplayMode.Paused);
    expect(session.currentTick).toBe(0);
    expect(session.timeline).toHaveLength(1);
  });

  it("toggles replay playback", () => {
    const session = createReplaySession([], asSimulationTick(0));
    const playing = toggleReplaySessionPlayback(session);
    const paused = toggleReplaySessionPlayback(playing);

    expect(playing.mode).toBe(ReplayMode.Playing);
    expect(paused.mode).toBe(ReplayMode.Paused);
  });

  it("steps replay forward and returns events at next tick", () => {
    const event = createReplayMissionStartedEventFixture(
      asEventId("event-a"),
      asSimulationTick(1),
    );

    const session = createReplaySession([event], asSimulationTick(0));
    const result = stepReplaySessionForward(session);

    expect(result.session.currentTick).toBe(1);
    expect(result.eventsAtTick).toHaveLength(1);
  });

  it("steps replay backward", () => {
    const session = createReplaySession([], asSimulationTick(3));
    const result = stepReplaySessionBackward(session);

    expect(result.session.currentTick).toBe(2);
    expect(result.session.mode).toBe(ReplayMode.Paused);
  });
});

describe("replay checkpoints", () => {
  it("finds latest checkpoint before tick", () => {
    const checkpointStore = addReplayCheckpoint(
      createReplayCheckpointStore(),
      {
        tick: asSimulationTick(2),
        digest: asDigest("digest-2"),
        snapshot: {
          missionId: asMissionId("mission-001"),
          scenarioId: asScenarioId("scenario-001"),
          seed: asSimulationSeed(42),
          tick: asSimulationTick(2),
          missionStatus: MissionStatus.Active,
          missionPhase: MissionPhase.Ingress,
          aircraft: [],
          snapshotDigest: asDigest("digest-2"),
      },
      },
    );

    const checkpoint = findLatestCheckpointAtOrBeforeTick(
      checkpointStore,
      asSimulationTick(3),
    );

    expect(checkpoint?.digest).toBe("digest-2");
  });
});

describe("replay verification", () => {
  it("verifies matching digest", () => {
    const stamp = verifyReplayDigest(
      asDigest("digest-a"),
      asDigest("digest-a"),
      asSimulationTick(4),
    );

    expect(stamp.status).toBe(ReplayVerificationStatus.Verified);
  });

  it("detects drift for mismatched digest", () => {
    const stamp = detectReplayDrift({
      expectedDigest: asDigest("digest-a"),
      reconstructedDigest: asDigest("digest-b"),
      tick: asSimulationTick(4),
    });

    expect(stamp.status).toBe(ReplayVerificationStatus.DriftDetected);
  });

  it("applies verification stamp to replay session", () => {
    const session = createReplaySession([], asSimulationTick(0));
    const stamp = verifyReplayDigest(
      asDigest("digest-a"),
      asDigest("digest-a"),
      asSimulationTick(4),
    );

    const verifiedSession = applyReplayVerification(session, stamp);

    expect(verifiedSession.verificationStamp?.status).toBe(
      ReplayVerificationStatus.Verified,
    );
  });
});