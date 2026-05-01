export type MissionOutcomeStatus =
  | "SUCCESS"
  | "FAILED"
  | "PARTIAL";

export type MissionOutcome = {
  readonly status: MissionOutcomeStatus;
  readonly reason: string;
};