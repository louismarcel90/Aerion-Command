/// <reference lib="dom" />
import { trainingScenario } from "./packs/training-scenario.js";

console.log("SCENARIO KIT");
console.log("------------");
console.log(`Scenario ID : ${trainingScenario.metadata.scenarioId}`);
console.log(`Title       : ${trainingScenario.metadata.title}`);
console.log(`Kind        : ${trainingScenario.metadata.kind}`);
console.log(`Aircraft    : ${trainingScenario.aircraft.length}`);
console.log(`Objectives  : ${trainingScenario.objectives.length}`);
console.log(`Faults      : ${trainingScenario.faults.length}`);
console.log("Scenario demo entrypoint is ready.");
console.log("Use this package for reusable scenario definitions.");