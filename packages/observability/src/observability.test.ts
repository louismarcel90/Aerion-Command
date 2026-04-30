import { describe, expect, it } from "vitest";
import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import {
  AnomalySeverity,
  buildLogEntry,
  buildMetricsSnapshot,
  buildRuntimeStatistics,
  countSimulationEvents,
  createCommandReceivedEventFixture,
  createFaultInjectedEventFixture,
  createInvariantViolationEventFixture,
  createMissionStatusEventFixture,
  detectEventAnomalies,
  getEventTypeCount,
  LogLevel,
} from "./index.js";
import { asMissionId, asSimulationTick } from "./fixtures/observability-fixtures.js";

describe("structured logs", () => {
  it("builds structured log entries", () => {
    const entry = buildLogEntry(
      LogLevel.Info,
      asMissionId("mission-001"),
      asSimulationTick(5),
      "Mission status changed.",
      ReasonCode.MissionStarted,
    );

    expect(entry.level).toBe(LogLevel.Info);
    expect(entry.tick).toBe(5);
    expect(entry.reasonCode).toBe(ReasonCode.MissionStarted);
  });
});

describe("event counters", () => {
  it("counts events by type", () => {
    const events = [
      createCommandReceivedEventFixture(),
      createFaultInjectedEventFixture(),
      createMissionStatusEventFixture(),
    ];

    const counter = countSimulationEvents(events);

    expect(counter.totalEvents).toBe(3);
    expect(getEventTypeCount(counter, SimulationEventType.CommandReceived)).toBe(1);
    expect(getEventTypeCount(counter, SimulationEventType.FaultInjected)).toBe(1);
  });
});

describe("anomaly detection", () => {
  it("detects invariant violation anomalies", () => {
    const anomalies = detectEventAnomalies([createInvariantViolationEventFixture()]);

    expect(anomalies).toHaveLength(1);
    expect(anomalies[0]?.severity).toBe(AnomalySeverity.Critical);
  });
});

describe("metrics snapshot", () => {
  it("builds metrics from simulation events", () => {
    const events = [
      createCommandReceivedEventFixture(),
      createFaultInjectedEventFixture(),
      createInvariantViolationEventFixture(),
    ];

    const metrics = buildMetricsSnapshot(asSimulationTick(10), events);

    expect(metrics.tick).toBe(10);
    expect(metrics.totalEvents).toBe(3);
    expect(metrics.commandEventCount).toBe(1);
    expect(metrics.faultEventCount).toBe(1);
    expect(metrics.anomalyCount).toBe(1);
  });
});

describe("runtime statistics", () => {
  it("clamps negative runtime statistics", () => {
    const stats = buildRuntimeStatistics({
      tick: asSimulationTick(11),
      tickDurationMs: -1,
      renderDurationMs: 5,
      replayStepDurationMs: -3,
      droppedFrameCount: -2,
    });

    expect(stats.tickDurationMs).toBe(0);
    expect(stats.renderDurationMs).toBe(5);
    expect(stats.replayStepDurationMs).toBe(0);
    expect(stats.droppedFrameCount).toBe(0);
  });
});