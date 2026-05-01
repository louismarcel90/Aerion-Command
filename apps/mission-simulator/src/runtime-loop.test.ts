import { describe, expect, it } from "vitest";
import { renderAsciiScreenToString } from "@aerion/renderer-ascii";
import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeLoop } from "./loop/run-runtime-loop.js";
import {
  asMissionId,
  createRuntimeCommandSequenceFixture,
  createRuntimeFaultScenarioFixture,
  createRuntimeScenarioFixture,
} from "./fixtures/runtime-fixtures.js";

describe("mission simulator runtime loop", () => {
  it("runs multiple runtime ticks and accumulates history", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-runtime-loop-test-001"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 4,
      scheduledCommands: createRuntimeCommandSequenceFixture(),
      faultScenario: null,
    });

    expect(result.history.entries).toHaveLength(4);
    expect(result.finalContext.state.tick).toBe(4);
    expect(result.accumulatedEvents.length).toBeGreaterThan(0);
  });

  it("applies active faults from fault scenario", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-runtime-loop-test-002"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 3,
      scheduledCommands: createRuntimeCommandSequenceFixture(),
      faultScenario: createRuntimeFaultScenarioFixture(),
    });

    expect(result.finalContext.activeFaultCodes.length).toBeGreaterThanOrEqual(0);
    expect(result.history.entries).toHaveLength(3);
  });

  it("renders final loop screen", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-runtime-loop-test-003"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 2,
      scheduledCommands: createRuntimeCommandSequenceFixture(),
      faultScenario: createRuntimeFaultScenarioFixture(),
    });

    const lastEntry = result.history.entries[result.history.entries.length - 1];

    if (lastEntry === undefined) {
      throw new Error("Expected final runtime history entry.");
    }

    const output = renderAsciiScreenToString(lastEntry.screen);

    expect(output).toContain("AERION COMMAND");
    expect(output).toContain("AIRSPACE");
    expect(output).toContain("PLAYER");
  });
});