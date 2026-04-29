export const MissionStatus = {
  Planned: "PLANNED",
  Active: "ACTIVE",
  Paused: "PAUSED",
  Succeeded: "SUCCEEDED",
  Failed: "FAILED",
  Aborted: "ABORTED",
} as const;

export type MissionStatus = (typeof MissionStatus)[keyof typeof MissionStatus];