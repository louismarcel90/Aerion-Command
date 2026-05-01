import { describe, expect, it } from "vitest";
import type { SimulationTick } from "@aerion/contracts";
import {
  asMissionId,
  buildRuntimeDebrief,
  computeRuntimeHistoryDigest,
  createRuntimeCommandSequenceFixture,
  createRuntimeContext,
  createRuntimeFaultScenarioFixture,
  createRuntimeReplay,
  createRuntimeScenarioFixture,
  runRuntimeLoop,
} from "@aerion/mission-simulator";
import { buildShowcaseSummary } from "./showcase-summary.js";
import { renderShowcaseSummary } from "./render-showcase-summary.js";

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

describe("showcase runner", () => {
  it("builds a recruiter-ready showcase summary", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-showcase-test-001"),
      scenario: createRuntimeScenarioFixture(),
    });

    const loopResult = runRuntimeLoop(context, {
      ticksToRun: 4,
      scheduledCommands: createRuntimeCommandSequenceFixture(),
      faultScenario: createRuntimeFaultScenarioFixture(),
    });

    const replay = createRuntimeReplay(
      loopResult.history,
      computeRuntimeHistoryDigest(loopResult.history),
      asSimulationTick(0),
    );

    const debrief = buildRuntimeDebrief(loopResult.history);
    const summary = buildShowcaseSummary(
      loopResult,
      replay,
      debrief.summary.sections.length,
    );

    const output = renderShowcaseSummary(summary);

    expect(summary.ticksExecuted).toBe(4);
    expect(summary.eventCount).toBeGreaterThan(0);
    expect(summary.debriefSectionCount).toBeGreaterThan(0);
    expect(output).toContain("SHOWCASE SUMMARY");
    expect(output).toContain("Replay status");
  });
});