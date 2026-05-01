import { renderAsciiScreenToString } from "@aerion/renderer-ascii";

import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeLoop } from "./loop/run-runtime-loop.js";
import {
  asMissionId,
  createRuntimeCommandSequenceFixture,
  createRuntimeFaultScenarioFixture,
  createRuntimeScenarioFixture,
} from "./fixtures/runtime-fixtures.js";

const context = createRuntimeContext({
  missionId: asMissionId("mission-runtime-loop-demo-001"),
  scenario: createRuntimeScenarioFixture(),
});

const result = runRuntimeLoop(context, {
  ticksToRun: 4,
  scheduledCommands: createRuntimeCommandSequenceFixture(),
  faultScenario: createRuntimeFaultScenarioFixture(),
});

const lastEntry = result.history.entries[result.history.entries.length - 1];

if (lastEntry === undefined) {
  throw new Error("Runtime loop produced no history entries.");
}

console.log(renderAsciiScreenToString(lastEntry.screen));
console.log("");
console.log("RUNTIME LOOP SUMMARY");
console.log("--------------------");
console.log(`Ticks executed: ${result.history.entries.length}`);
console.log(`Final tick: ${result.finalContext.state.tick}`);
console.log(`Mission status: ${result.finalContext.state.missionStatus}`);
console.log(`Accumulated events: ${result.accumulatedEvents.length}`);
console.log(`Final assurance passed: ${lastEntry.assuranceReport.passed}`);
console.log(`Active faults: ${result.finalContext.activeFaultCodes.join(",") || "none"}`);