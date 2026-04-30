export const FlightManeuverCommand = {
  IncreaseSpeed: "INCREASE_SPEED",
  DecreaseSpeed: "DECREASE_SPEED",
  TurnLeft: "TURN_LEFT",
  TurnRight: "TURN_RIGHT",
  Climb: "CLIMB",
  Descend: "DESCEND",
  HoldCourse: "HOLD_COURSE",
} as const;

export type FlightManeuverCommand =
  (typeof FlightManeuverCommand)[keyof typeof FlightManeuverCommand];