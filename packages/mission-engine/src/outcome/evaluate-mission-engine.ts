import {
  replaceObjectives,
  transitionMissionPhase,
  transitionMissionStatus,
} from "@aerion/state-store";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import { evaluateMissionPhase } from "../phase/evaluate-mission-phase.js";
import { evaluateObjectives } from "../objectives/evaluate-objectives.js";
import { evaluateMissionOutcome } from "./evaluate-mission-outcome.js";
import { computeMissionScore } from "../score/compute-mission-score.js";
import { buildMissionTimelineEntry } from "../timeline/build-mission-timeline-entry.js";
import type { MissionEngineResult } from "./mission-engine-result.js";
import type { ReasonCode } from "@aerion/contracts";

export type MissionEngineEvaluationConfiguration = {
  readonly requiredSurvivalTicks: number;
};

export const defaultMissionEngineEvaluationConfiguration: MissionEngineEvaluationConfiguration = {
  requiredSurvivalTicks: 120,
};

export const evaluateMissionEngine = (
  state: AuthoritativeSimulationState,
  configuration: MissionEngineEvaluationConfiguration = defaultMissionEngineEvaluationConfiguration,
): MissionEngineResult => {
  const phaseEvaluation = evaluateMissionPhase(state);

  const stateAfterPhase = phaseEvaluation.changed
    ? transitionMissionPhase(state, phaseEvaluation.nextPhase)
    : state;

  const objectiveEvaluations = evaluateObjectives({
    objectives: stateAfterPhase.objectives,
    aircraft: stateAfterPhase.aircraft,
    missiles: stateAfterPhase.missiles,
    requiredSurvivalTicks: configuration.requiredSurvivalTicks,
    currentTick: stateAfterPhase.tick,
  });

  const objectives = objectiveEvaluations.map((evaluation) => evaluation.objective);

const stateAfterObjectives = replaceObjectives(stateAfterPhase, objectives);

  const outcomeEvaluation = evaluateMissionOutcome(
    stateAfterObjectives.missionStatus,
    stateAfterObjectives.aircraft,
    stateAfterObjectives.objectives,
  );

  const stateAfterOutcome = outcomeEvaluation.changed
    ? transitionMissionStatus(stateAfterObjectives, outcomeEvaluation.nextStatus)
    : stateAfterObjectives;

  const score = computeMissionScore(
    stateAfterOutcome.objectives,
    stateAfterOutcome.aircraft,
    stateAfterOutcome.tick,
  );

  const timelineEntries = [
    ...(phaseEvaluation.reasonCode
      ? [
          buildMissionTimelineEntry(
            state.tick,
            "Mission phase updated.",
            phaseEvaluation.reasonCode,
          ),
        ]
      : []),
    ...objectiveEvaluations
      .filter(
  (evaluation): evaluation is typeof evaluation & { reasonCode: ReasonCode } =>
    evaluation.reasonCode !== null
)
.map((evaluation) =>
  buildMissionTimelineEntry(
    state.tick,
    `Objective updated: ${evaluation.objective.label}`,
    evaluation.reasonCode,
  ),
),
    ...(outcomeEvaluation.reasonCode
      ? [
          buildMissionTimelineEntry(
            state.tick,
            "Mission outcome updated.",
            outcomeEvaluation.reasonCode,
          ),
        ]
      : []),
  ];

  return {
    state: stateAfterOutcome,
    score,
    timelineEntries,
  };
};