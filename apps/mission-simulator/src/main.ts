import { renderAsciiScreenToString } from "@aerion/renderer-ascii";
import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeStep } from "./runtime/run-runtime-step.js";
import {
  asMissionId,
  createRuntimeCommandFixture,
  createRuntimeScenarioFixture,
} from "./runtime/runtime-fixtures.js";

const context = createRuntimeContext({
  missionId: asMissionId("mission-runtime-demo-001"),
  scenario: createRuntimeScenarioFixture(),
  commands: [createRuntimeCommandFixture()],
});

const result = runRuntimeStep(context);

console.log(renderAsciiScreenToString(result.screen));
console.log("");
console.log("RUNTIME SUMMARY");
console.log("---------------");
console.log(`Tick: ${result.state.tick}`);
console.log(`Mission status: ${result.state.missionStatus}`);
console.log(`Events: ${result.events.length}`);
console.log(`Assurance passed: ${result.assuranceReport.passed}`);
console.log(`Kernel random sample: ${result.stepReport.randomSample.toFixed(6)}`);