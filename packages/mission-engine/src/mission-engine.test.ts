import { describe, expect, it } from "vitest";
import { MissionPhase, MissionStatus, ReasonCode } from "@aerion/contracts";
import { MissionObjectiveStatus } from "@aerion/domain";
import {
  advanceStateTick,
  transitionMissionPhase,
} from "@aerion/state-store";
import {
  computeMissionScore,
  createActiveInterceptMissionFixture,
  createInterceptCompletedMissionFixture,
  createSurvivalMissionFixture,
  evaluateMissionEngine,
  evaluateMissionOutcome,
  evaluateMissionPhase,
  evaluateObjectives,
} from "./index.js";

describe("mission phase evaluation", () => {
  it("advances briefing to ingress after mission tick starts", () => {
    const state = advanceStateTick(createActiveInterceptMissionFixture());

    const evaluation = evaluateMissionPhase(state);

    expect(evaluation.changed).toBe(true);
    expect(evaluation.nextPhase).toBe(MissionPhase.Ingress);
    expect(evaluation.reasonCode).toBe(ReasonCode.MissionStarted);
  });

  it("advances engagement to egress after resolved hit", () => {
    const state = transitionMissionPhase(
      createInterceptCompletedMissionFixture(),
      MissionPhase.Engagement,
    );

    const evaluation = evaluateMissionPhase(state);

    expect(evaluation.changed).toBe(true);
    expect(evaluation.nextPhase).toBe(MissionPhase.Egress);
    expect(evaluation.reasonCode).toBe(ReasonCode.MissionPhaseAdvancedEgress);
  });
});

describe("objective evaluation", () => {
  it("completes intercept objective after missile hit", () => {
    const state = createInterceptCompletedMissionFixture();

    const evaluations = evaluateObjectives({
      objectives: state.objectives,
      aircraft: state.aircraft,
      missiles: state.missiles,
      requiredSurvivalTicks: 120,
      currentTick: state.tick,
    });

    expect(evaluations[0]?.objective.status).toBe(MissionObjectiveStatus.Completed);
    expect(evaluations[0]?.reasonCode).toBe(
      ReasonCode.MissionObjectiveCompletedIntercept,
    );
  });

  it("completes survival objective after required ticks", () => {
    const state = createSurvivalMissionFixture();

    const evaluations = evaluateObjectives({
      objectives: state.objectives,
      aircraft: state.aircraft,
      missiles: state.missiles,
      requiredSurvivalTicks: 5,
      currentTick: 5,
    });

    expect(evaluations[0]?.objective.status).toBe(MissionObjectiveStatus.Completed);
    expect(evaluations[0]?.reasonCode).toBe(ReasonCode.MissionObjectiveCompletedSurvive);
  });
});

describe("mission outcome evaluation", () => {
  it("marks mission succeeded when all objectives complete", () => {
    const state = createInterceptCompletedMissionFixture();
    const evaluations = evaluateObjectives({
      objectives: state.objectives,
      aircraft: state.aircraft,
      missiles: state.missiles,
      requiredSurvivalTicks: 120,
      currentTick: state.tick,
    });

    const outcome = evaluateMissionOutcome(
      state.missionStatus,
      state.aircraft,
      evaluations.map((evaluation) => evaluation.objective),
    );

    expect(outcome.changed).toBe(true);
    expect(outcome.nextStatus).toBe(MissionStatus.Succeeded);
    expect(outcome.reasonCode).toBe(ReasonCode.MissionSucceededObjectiveComplete);
  });
});

describe("mission score", () => {
  it("computes score from completed objectives and survival", () => {
    const state = createInterceptCompletedMissionFixture();
    const evaluations = evaluateObjectives({
      objectives: state.objectives,
      aircraft: state.aircraft,
      missiles: state.missiles,
      requiredSurvivalTicks: 120,
      currentTick: state.tick,
    });

    const score = computeMissionScore(
      evaluations.map((evaluation) => evaluation.objective),
      state.aircraft,
      10,
    );

    expect(score.totalScore).toBeGreaterThan(0);
    expect(score.reasonCode).toBe(ReasonCode.MissionScoreComputed);
  });
});

describe("mission engine", () => {
  it("evaluates full mission engine result with timeline entries", () => {
    const state = createInterceptCompletedMissionFixture();

    const result = evaluateMissionEngine(state);

    expect(result.state.missionStatus).toBe(MissionStatus.Succeeded);
    expect(result.score.totalScore).toBeGreaterThan(0);
    expect(result.timelineEntries.length).toBeGreaterThan(0);
  });
});