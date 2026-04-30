import type { Aircraft, RadarTrack } from "@aerion/domain";
import { FlightManeuverCommand } from "@aerion/flight-model";
import type { FlightManeuverCommand as FlightManeuverCommandType } from "@aerion/flight-model";
import { ThreatBehaviorMode } from "../behavior/threat-behavior-state.js";

export const planThreatManeuver = (
  threatAircraft: Aircraft,
  selectedTrack: RadarTrack | null,
  mode: ThreatBehaviorMode,
): FlightManeuverCommandType => {
  if (mode === ThreatBehaviorMode.Retreat) {
    return FlightManeuverCommand.TurnRight;
  }

  if (mode === ThreatBehaviorMode.Evade) {
    return threatAircraft.measurements.headingDegrees % 2 === 0
      ? FlightManeuverCommand.TurnLeft
      : FlightManeuverCommand.TurnRight;
  }

  if (selectedTrack === null) {
    return FlightManeuverCommand.HoldCourse;
  }

  if (mode === ThreatBehaviorMode.Engage) {
    return FlightManeuverCommand.IncreaseSpeed;
  }

  if (mode === ThreatBehaviorMode.Intercept) {
    return FlightManeuverCommand.TurnLeft;
  }

  return FlightManeuverCommand.HoldCourse;
};