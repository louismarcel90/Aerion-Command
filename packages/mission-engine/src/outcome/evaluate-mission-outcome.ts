import { MissionStatus, ReasonCode } from "@aerion/contracts";
import { MissionObjectiveStatus } from "@aerion/domain";
import type { Aircraft, MissionObjective } from "@aerion/domain";
import type { MissionOutcomeEvaluation } from "./mission-outcome-evaluation.js";

export const evaluateMissionOutcome = (
  currentStatus: MissionStatus,
  aircraft: readonly Aircraft[],
  objectives: readonly MissionObjective[],
): MissionOutcomeEvaluation => {
  if (
    currentStatus === MissionStatus.Succeeded ||
    currentStatus === MissionStatus.Failed ||
    currentStatus === MissionStatus.Aborted
  ) {
    return {
      nextStatus: currentStatus,
      changed: false,
      reasonCode: null,
    };
  }

  const playerDestroyed = aircraft.some(
    (aircraftItem) => aircraftItem.role === "PLAYER" && aircraftItem.isDestroyed,
  );

  if (playerDestroyed) {
    return {
      nextStatus: MissionStatus.Failed,
      changed: true,
      reasonCode: ReasonCode.MissionFailedPlayerDestroyed,
    };
  }

  const failedObjective = objectives.some(
    (objective) => objective.status === MissionObjectiveStatus.Failed,
  );

  if (failedObjective) {
    return {
      nextStatus: MissionStatus.Failed,
      changed: true,
      reasonCode: ReasonCode.MissionFailedEscortDestroyed,
    };
  }

  const allObjectivesCompleted =
    objectives.length > 0 &&
    objectives.every((objective) => objective.status === MissionObjectiveStatus.Completed);

  if (allObjectivesCompleted) {
    return {
      nextStatus: MissionStatus.Succeeded,
      changed: true,
      reasonCode: ReasonCode.MissionSucceededObjectiveComplete,
    };
  }

  if (currentStatus === MissionStatus.Planned) {
    return {
      nextStatus: MissionStatus.Active,
      changed: true,
      reasonCode: ReasonCode.MissionStarted,
    };
  }

  return {
    nextStatus: currentStatus,
    changed: false,
    reasonCode: null,
  };
};