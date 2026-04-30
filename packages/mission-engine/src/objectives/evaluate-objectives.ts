import { ReasonCode } from "@aerion/contracts";
import {
  createMissionObjective,
  MissionObjectiveStatus,
  MissionObjectiveType,
} from "@aerion/domain";
import type { Aircraft, MissionObjective, Missile } from "@aerion/domain";
import type { ObjectiveEvaluation } from "./objective-evaluation.js";

export type ObjectiveEvaluationInput = {
  readonly objectives: readonly MissionObjective[];
  readonly aircraft: readonly Aircraft[];
  readonly missiles: readonly Missile[];
  readonly requiredSurvivalTicks: number;
  readonly currentTick: number;
};

export const evaluateObjectives = (
  input: ObjectiveEvaluationInput,
): readonly ObjectiveEvaluation[] => {
  return input.objectives.map((objective) =>
    evaluateObjective(
      objective,
      input.aircraft,
      input.missiles,
      input.requiredSurvivalTicks,
      input.currentTick,
    ),
  );
};

const evaluateObjective = (
  objective: MissionObjective,
  aircraft: readonly Aircraft[],
  missiles: readonly Missile[],
  requiredSurvivalTicks: number,
  currentTick: number,
): ObjectiveEvaluation => {
  if (
    objective.status === MissionObjectiveStatus.Completed ||
    objective.status === MissionObjectiveStatus.Failed
  ) {
    return {
      objective,
      changed: false,
      reasonCode: null,
    };
  }

  if (objective.type === MissionObjectiveType.Intercept) {
    const interceptCompleted = missiles.some((missile) => missile.status === "RESOLVED_HIT");

    if (interceptCompleted) {
      return {
        objective: createMissionObjective({
          ...objective,
          status: MissionObjectiveStatus.Completed,
        }),
        changed: true,
        reasonCode: ReasonCode.MissionObjectiveCompletedIntercept,
      };
    }
  }

  if (objective.type === MissionObjectiveType.Escort) {
    const escortDestroyed = aircraft.some(
      (aircraftItem) => aircraftItem.role === "ESCORT" && aircraftItem.isDestroyed,
    );

    if (escortDestroyed) {
      return {
        objective: createMissionObjective({
          ...objective,
          status: MissionObjectiveStatus.Failed,
        }),
        changed: true,
        reasonCode: ReasonCode.MissionObjectiveFailedEscortDestroyed,
      };
    }
  }

  if (objective.type === MissionObjectiveType.Survive) {
    const playerDestroyed = aircraft.some(
      (aircraftItem) => aircraftItem.role === "PLAYER" && aircraftItem.isDestroyed,
    );

    if (playerDestroyed) {
      return {
        objective: createMissionObjective({
          ...objective,
          status: MissionObjectiveStatus.Failed,
        }),
        changed: true,
        reasonCode: ReasonCode.MissionObjectiveFailedPlayerDestroyed,
      };
    }

    if (currentTick >= requiredSurvivalTicks) {
      return {
        objective: createMissionObjective({
          ...objective,
          status: MissionObjectiveStatus.Completed,
        }),
        changed: true,
        reasonCode: ReasonCode.MissionObjectiveCompletedSurvive,
      };
    }
  }

  return {
    objective,
    changed: false,
    reasonCode: null,
  };
};