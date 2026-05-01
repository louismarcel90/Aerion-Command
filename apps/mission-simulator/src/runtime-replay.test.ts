import { describe, expect, it } from "vitest";
import type { Digest, SimulationTick } from "@aerion/contracts";
import { ReplayVerificationStatus } from "@aerion/contracts";
import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeLoop } from "./loop/run-runtime-loop.js";
import {
  asMissionId,
  createRuntimeCommandSequenceFixture,
  createRuntimeFaultScenarioFixture,
  createRuntimeScenarioFixture,
} from "./fixtures/runtime-fixtures.js";
import {
  buildDriftedRuntimeReplay,
  buildRuntimeReplaySummary,
  computeRuntimeHistoryDigest,
  createRuntimeReplay,
  extractRuntimeEventLog,
  isRuntimeReplayVerified,
  stepRuntimeReplayForward,
} from "./replay/index.js";

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

const asDigest = (value: string): Digest => {
  return value as Digest;
};

const createLoopResult = () => {
  const context = createRuntimeContext({
    missionId: asMissionId("mission-runtime-replay-test"),
    scenario: createRuntimeScenarioFixture(),
  });

  return runRuntimeLoop(context, {
    ticksToRun: 4,
    scheduledCommands: createRuntimeCommandSequenceFixture(),
    faultScenario: createRuntimeFaultScenarioFixture(),
  });
};

describe("runtime replay integration", () => {
  it("extracts ordered runtime event log from runtime history", () => {
    const loopResult = createLoopResult();

    const eventLog = extractRuntimeEventLog(loopResult.history);

    expect(eventLog.length).toBeGreaterThan(0);

    const orderedTicks = eventLog.map((event) => event.occurredAtTick);
    const sortedTicks = [...orderedTicks].sort((left, right) => left - right);

    expect(orderedTicks).toEqual(sortedTicks);
  });

  it("computes stable runtime history digest", () => {
    const loopResult = createLoopResult();

    const firstDigest = computeRuntimeHistoryDigest(loopResult.history);
    const secondDigest = computeRuntimeHistoryDigest(loopResult.history);

    expect(firstDigest).toBe(secondDigest);
    expect(firstDigest.length).toBe(64);
  });

  it("creates verified runtime replay from matching digest", () => {
    const loopResult = createLoopResult();
    const expectedDigest = computeRuntimeHistoryDigest(loopResult.history);

    const replay = createRuntimeReplay(
      loopResult.history,
      expectedDigest,
      asSimulationTick(0),
    );

    expect(replay.verificationStamp.status).toBe(ReplayVerificationStatus.Verified);
    expect(isRuntimeReplayVerified(replay)).toBe(true);
    expect(replay.replaySession.timeline.length).toBe(replay.eventLog.length);
  });

  it("detects drift when expected digest differs", () => {
    const loopResult = createLoopResult();

    const replay = buildDriftedRuntimeReplay(
      loopResult.history,
      asDigest("drifted-digest"),
      asSimulationTick(0),
    );

    expect(replay.verificationStamp.status).toBe(
      ReplayVerificationStatus.DriftDetected,
    );
  });

  it("steps runtime replay forward and returns events at next tick", () => {
    const loopResult = createLoopResult();
    const expectedDigest = computeRuntimeHistoryDigest(loopResult.history);

    const replay = createRuntimeReplay(
      loopResult.history,
      expectedDigest,
      asSimulationTick(0),
    );

    const step = stepRuntimeReplayForward(replay);

    expect(step.session.currentTick).toBe(1);
    expect(step.eventsAtTick.length).toBeGreaterThan(0);
  });

  it("builds runtime replay summary", () => {
    const loopResult = createLoopResult();
    const expectedDigest = computeRuntimeHistoryDigest(loopResult.history);

    const replay = createRuntimeReplay(
      loopResult.history,
      expectedDigest,
      asSimulationTick(0),
    );

    const summary = buildRuntimeReplaySummary(replay);

    expect(summary.eventCount).toBeGreaterThan(0);
    expect(summary.timelineEntryCount).toBeGreaterThan(0);
    expect(summary.verificationStatus).toBe(ReplayVerificationStatus.Verified);
  });
});