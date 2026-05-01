import type { Digest, SimulationTick } from "@aerion/contracts";
import { renderAsciiScreenToString } from "@aerion/renderer-ascii";
import {
  asMissionId,
  buildRuntimeDebrief,
  buildRuntimeReplaySummary,
  computeRuntimeHistoryDigest,
  createRuntimeCommandSequenceFixture,
  createRuntimeContext,
  createRuntimeFaultScenarioFixture,
  createRuntimeReplay,
  createRuntimeScenarioFixture,
  renderDebriefToString,
  runRuntimeLoop,
} from "@aerion/mission-simulator";
import { buildShowcaseSummary } from "./showcase-summary.js";
import { renderShowcaseSummary } from "./render-showcase-summary.js";

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

const context = createRuntimeContext({
  missionId: asMissionId("mission-showcase-001"),
  scenario: createRuntimeScenarioFixture(),
});

const loopResult = runRuntimeLoop(context, {
  ticksToRun: 6,
  scheduledCommands: createRuntimeCommandSequenceFixture(),
  faultScenario: createRuntimeFaultScenarioFixture(),
});

const lastEntry = loopResult.history.entries[loopResult.history.entries.length - 1];

if (lastEntry === undefined) {
  throw new Error("Showcase runner produced no runtime history.");
}

const expectedDigest: Digest = computeRuntimeHistoryDigest(loopResult.history);
const replayResult = createRuntimeReplay(
  loopResult.history,
  expectedDigest,
  asSimulationTick(0),
);

const replaySummary = buildRuntimeReplaySummary(replayResult);
const debrief = buildRuntimeDebrief(loopResult.history);

const showcaseSummary = buildShowcaseSummary(
  loopResult,
  replayResult,
  debrief.summary.sections.length,
);

console.log(renderAsciiScreenToString(lastEntry.screen));

console.log("");
console.log("REPLAY VERIFICATION");
console.log("-------------------");
console.log(`Status          : ${replaySummary.verificationStatus}`);
console.log(`Events          : ${replaySummary.eventCount}`);
console.log(`Timeline entries: ${replaySummary.timelineEntryCount}`);
console.log(`Expected digest : ${replaySummary.expectedDigest}`);
console.log(`Actual digest   : ${replaySummary.actualDigest}`);

console.log("");
console.log("MISSION DEBRIEF");
console.log("---------------");
console.log(renderDebriefToString(debrief));

console.log(renderShowcaseSummary(showcaseSummary));