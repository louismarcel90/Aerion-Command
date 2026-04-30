import { ReasonCode } from "@aerion/contracts";
import { MissionObjectiveStatus } from "@aerion/domain";
import type { Aircraft, MissionObjective } from "@aerion/domain";
import type { MissionScore } from "./mission-score.js";

export const computeMissionScore = (
  objectives: readonly MissionObjective[],
  aircraft: readonly Aircraft[],
  currentTick: number,
): MissionScore => {
  const completedObjectives = objectives.filter(
    (objective) => objective.status === MissionObjectiveStatus.Completed,
  );

  const objectiveScore = completedObjectives.length * 250;
  const playerAlive = aircraft.some(
    (aircraftItem) => aircraftItem.role === "PLAYER" && !aircraftItem.isDestroyed,
  );
  const survivalScore = playerAlive ? 300 : 0;
  const efficiencyScore = Math.max(0, 250 - currentTick);

  return {
    objectiveScore,
    survivalScore,
    efficiencyScore,
    totalScore: objectiveScore + survivalScore + efficiencyScore,
    reasonCode: ReasonCode.MissionScoreComputed,
  };
};