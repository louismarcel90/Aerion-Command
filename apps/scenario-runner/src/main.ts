import { listScenarioSummaries } from "@aerion/scenario-kit";

console.log("AERION COMMAND — Scenario Runner");
console.log("");

listScenarioSummaries().forEach((scenario) => {
  console.log(`${scenario.scenarioId} | ${scenario.kind} | ${scenario.title} | v${scenario.version}`);
});