export const ReplayMode = {
  Paused: "PAUSED",
  Playing: "PLAYING",
  Completed: "COMPLETED",
} as const;

export type ReplayMode = (typeof ReplayMode)[keyof typeof ReplayMode];