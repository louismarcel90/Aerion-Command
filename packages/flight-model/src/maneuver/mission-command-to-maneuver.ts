import { MissionCommandType } from "@aerion/contracts";
import type { MissionCommand } from "@aerion/contracts";
import { FlightManeuverCommand } from "./flight-maneuver-command.js";
import type { FlightManeuverCommand as FlightManeuverCommandType } from "./flight-maneuver-command.js";

export const missionCommandToFlightManeuver = (
  command: MissionCommand,
): FlightManeuverCommandType | null => {
  switch (command.type) {
    case MissionCommandType.IncreaseSpeed:
      return FlightManeuverCommand.IncreaseSpeed;

    case MissionCommandType.DecreaseSpeed:
      return FlightManeuverCommand.DecreaseSpeed;

    case MissionCommandType.TurnLeft:
      return FlightManeuverCommand.TurnLeft;

    case MissionCommandType.TurnRight:
      return FlightManeuverCommand.TurnRight;

    case MissionCommandType.Climb:
      return FlightManeuverCommand.Climb;

    case MissionCommandType.Descend:
      return FlightManeuverCommand.Descend;

    case MissionCommandType.CycleRadarTarget:
    case MissionCommandType.AttemptLock:
    case MissionCommandType.FireWeapon:
    case MissionCommandType.DeployCountermeasure:
    case MissionCommandType.PauseMission:
    case MissionCommandType.ResumeMission:
    case MissionCommandType.ToggleTacticalOverlay:
    case MissionCommandType.ExpandEventPanel:
      return null;
  }
};