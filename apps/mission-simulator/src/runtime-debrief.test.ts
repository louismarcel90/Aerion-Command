import { describe, expect, it } from "vitest";
import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeLoop } from "./loop/run-runtime-loop.js";
import { buildRuntimeDebrief } from "./debrief/index.js";
import {
  asMissionId,
  createRuntimeCommandSequenceFixture,
  createRuntimeFaultScenarioFixture,
  createRuntimeScenarioFixture,
} from "./fixtures/runtime-fixtures.js";

describe("runtime debrief integration", () => {
  it("builds debrief summary from runtime history", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-debrief-test"),
      scenario: createRuntimeScenarioFixture(),
    });

    const loopResult = runRuntimeLoop(context, {
      ticksToRun: 4,
      scheduledCommands: createRuntimeCommandSequenceFixture(),
      faultScenario: createRuntimeFaultScenarioFixture(),
    });

    const debrief = buildRuntimeDebrief(loopResult.history);

    expect(debrief.summary.missionOutcome).toBeDefined();
    expect(debrief.summary.score).toBeDefined();
    expect(debrief.summary.sections.length).toBeGreaterThan(0);
  });
});