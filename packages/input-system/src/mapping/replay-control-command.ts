export const ReplayControlCommand = {
  PlayPause: "PLAY_PAUSE",
  StepForward: "STEP_FORWARD",
  StepBackward: "STEP_BACKWARD",
  ToggleDebriefOverlay: "TOGGLE_DEBRIEF_OVERLAY",
} as const;

export type ReplayControlCommand =
  (typeof ReplayControlCommand)[keyof typeof ReplayControlCommand];