export const MissionObjectiveType = {
  Intercept: "INTERCEPT",
  Escort: "ESCORT",
  DefendZone: "DEFEND_ZONE",
  Survive: "SURVIVE",
  EvaluateReplay: "EVALUATE_REPLAY",
} as const;

export type MissionObjectiveType =
  (typeof MissionObjectiveType)[keyof typeof MissionObjectiveType];

export const MissionObjectiveStatus = {
  Pending: "PENDING",
  Active: "ACTIVE",
  Completed: "COMPLETED",
  Failed: "FAILED",
} as const;

export type MissionObjectiveStatus =
  (typeof MissionObjectiveStatus)[keyof typeof MissionObjectiveStatus];

export type MissionObjective = {
  readonly objectiveId: string;
  readonly type: MissionObjectiveType;
  readonly label: string;
  readonly status: MissionObjectiveStatus;
  readonly priority: number;
};

export const createMissionObjective = (input: MissionObjective): MissionObjective => {
  return {
    ...input,
    priority: Math.max(1, input.priority),
  };
};