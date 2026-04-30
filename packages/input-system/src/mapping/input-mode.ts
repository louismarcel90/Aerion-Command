export const InputMode = {
  LiveMission: "LIVE_MISSION",
  Replay: "REPLAY",
  Debrief: "DEBRIEF",
} as const;

export type InputMode = (typeof InputMode)[keyof typeof InputMode];