import { describe, expect, it } from "vitest";
import { FaultCode } from "@aerion/contracts";
import { MissionObjectiveStatus } from "@aerion/domain";
import {
  asMissionId,
  buildFaultScenarioFromDefinition,
  buildInitialStateFromScenario,
  combatScenario,
  degradedScenario,
  evaluationScenario,
  failureScenario,
  findScenarioById,
  listScenarioSummaries,
  scenarioRegistry,
  showcaseScenario,
  trainingScenario,
  validateScenarioDefinition,
} from "./index.js";

describe("scenario validation", () => {
  it("validates all registered scenarios", () => {
    const results = scenarioRegistry.map(validateScenarioDefinition);

    expect(results.every((result) => result.valid)).toBe(true);
  });

  it("detects invalid scenario without player aircraft", () => {
    const invalidScenario = {
      ...trainingScenario,
      aircraft: trainingScenario.aircraft.filter(
        (aircraft) => aircraft.role !== "PLAYER",
      ),
    };

    const result = validateScenarioDefinition(invalidScenario);

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.field === "aircraft")).toBe(true);
  });
});

describe("scenario registry", () => {
  it("lists scenario summaries", () => {
    const summaries = listScenarioSummaries();

    expect(summaries.length).toBeGreaterThanOrEqual(6);
    expect(summaries.some((summary) => summary.title === trainingScenario.metadata.title)).toBe(
      true,
    );
  });

  it("finds scenario by id", () => {
    const found = findScenarioById(showcaseScenario.metadata.scenarioId);

    expect(found?.metadata.title).toBe(showcaseScenario.metadata.title);
  });

  it("contains expected scenario packs", () => {
    expect(scenarioRegistry).toContain(trainingScenario);
    expect(scenarioRegistry).toContain(combatScenario);
    expect(scenarioRegistry).toContain(degradedScenario);
    expect(scenarioRegistry).toContain(failureScenario);
    expect(scenarioRegistry).toContain(showcaseScenario);
    expect(scenarioRegistry).toContain(evaluationScenario);
  });
});

describe("scenario builders", () => {
  it("builds initial authoritative state from scenario", () => {
    const state = buildInitialStateFromScenario(
      asMissionId("mission-scenario-test"),
      trainingScenario,
    );

    expect(state.scenarioId).toBe(trainingScenario.metadata.scenarioId);
    expect(state.aircraft.length).toBe(trainingScenario.aircraft.length);
    expect(state.objectives[0]?.status).toBe(MissionObjectiveStatus.Active);
    expect(state.stateDigest.length).toBe(64);
  });

  it("builds fault injection scenario from degraded scenario", () => {
    const faultScenario = buildFaultScenarioFromDefinition(degradedScenario);

    expect(faultScenario.scheduledFaults.length).toBeGreaterThan(0);
    expect(faultScenario.scheduledFaults[0]?.faultCode).toBe(FaultCode.RadarDegraded);
  });
});