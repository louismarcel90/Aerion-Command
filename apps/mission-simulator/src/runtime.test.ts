import { describe, expect, it } from "vitest";
import { renderAsciiScreenToString } from "@aerion/renderer-ascii";
import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeStep } from "./runtime/run-runtime-step.js";
import {
  asMissionId,
  createRuntimeCommandFixture,
  createRuntimeScenarioFixture,
} from "./runtime/runtime-fixtures.js";

describe("mission simulator runtime integration", () => {
  it("runs one integrated runtime step", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-runtime-test-001"),
      scenario: createRuntimeScenarioFixture(),
      commands: [createRuntimeCommandFixture()],
    });

    const result = runRuntimeStep(context);

    expect(result.state.missionId).toBe("mission-runtime-test-001");
    expect(result.events.length).toBeGreaterThan(0);
    expect(result.assuranceReport.invariantResults.length).toBeGreaterThan(0);
    expect(result.stepReport.executedStages.length).toBeGreaterThan(0);
  });

  it("renders runtime screen output", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-runtime-test-002"),
      scenario: createRuntimeScenarioFixture(),
      commands: [createRuntimeCommandFixture()],
    });

    const result = runRuntimeStep(context);
    const output = renderAsciiScreenToString(result.screen);

    expect(output).toContain("AERION COMMAND");
    expect(output).toContain("AIRSPACE");
    expect(output).toContain("PLAYER");
  });
});