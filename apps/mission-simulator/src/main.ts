import type { Digest, SimulationTick } from "@aerion/contracts";import { renderAsciiScreenToString } from "@aerion/renderer-ascii";
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
  isRuntimeReplayVerified,
  stepRuntimeReplayForward,
} from "./replay/index.js";

const context = createRuntimeContext({
  missionId: asMissionId("mission-runtime-loop-demo-001"),
  scenario: createRuntimeScenarioFixture(),
});

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

const result = runRuntimeLoop(context, {
  ticksToRun: 4,
  scheduledCommands: createRuntimeCommandSequenceFixture(),
  faultScenario: createRuntimeFaultScenarioFixture(),
});

const lastEntry = result.history.entries[result.history.entries.length - 1];

if (lastEntry === undefined) {
  throw new Error("Runtime loop produced no history entries.");
}

const expectedDigest = computeRuntimeHistoryDigest(result.history);
const replay = createRuntimeReplay(result.history, expectedDigest, asSimulationTick(0));const replaySummary = buildRuntimeReplaySummary(replay);
const firstReplayStep = stepRuntimeReplayForward(replay);

const driftedReplay = buildDriftedRuntimeReplay(
  result.history,
  "drifted-digest" as Digest,
  asSimulationTick(0),
);

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
console.log("");
console.log("REPLAY SUMMARY");
console.log("--------------");
console.log(`Replay verified: ${isRuntimeReplayVerified(replay)}`);
console.log(`Replay status: ${replaySummary.verificationStatus}`);
console.log(`Replay events: ${replaySummary.eventCount}`);
console.log(`Replay timeline entries: ${replaySummary.timelineEntryCount}`);
console.log(`First replay step events: ${firstReplayStep.eventsAtTick.length}`);
console.log(`Drifted replay status: ${driftedReplay.verificationStamp.status}`);