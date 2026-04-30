import { MissionCommandType } from "@aerion/contracts";
import type {
  AircraftId,
  CommandId,
  MissionCommand,
  SimulationTick,
  TrackId,
} from "@aerion/contracts";
import { TerminalKey } from "../keys/terminal-key.js";
import { InputMode } from "./input-mode.js";
import { InputMappingResultType } from "./input-mapping-result.js";
import type { InputMappingResult } from "./input-mapping-result.js";
import { ReplayControlCommand } from "./replay-control-command.js";

export type KeyMappingContext = {
  readonly inputMode: InputMode;
  readonly commandId: CommandId;
  readonly issuedAtTick: SimulationTick;
  readonly aircraftId: AircraftId;
  readonly focusedTrackId: TrackId | null;
};

export const mapKeyToCommand = (
  key: TerminalKey,
  context: KeyMappingContext,
): InputMappingResult => {
  if (key === TerminalKey.Escape) {
    return {
      type: InputMappingResultType.ExitRequested,
    };
  }

  if (context.inputMode === InputMode.Replay) {
    return mapReplayKey(key);
  }

  if (context.inputMode === InputMode.Debrief) {
    return key === TerminalKey.D
      ? {
          type: InputMappingResultType.ReplayControl,
          replayControlCommand: ReplayControlCommand.ToggleDebriefOverlay,
        }
      : {
          type: InputMappingResultType.Ignored,
          reason: "Debrief mode accepts only debrief controls.",
        };
  }

  return mapLiveMissionKey(key, context);
};

const mapReplayKey = (key: TerminalKey): InputMappingResult => {
  switch (key) {
    case TerminalKey.Space:
      return {
        type: InputMappingResultType.ReplayControl,
        replayControlCommand: ReplayControlCommand.PlayPause,
      };

    case TerminalKey.RightBracket:
      return {
        type: InputMappingResultType.ReplayControl,
        replayControlCommand: ReplayControlCommand.StepForward,
      };

    case TerminalKey.LeftBracket:
      return {
        type: InputMappingResultType.ReplayControl,
        replayControlCommand: ReplayControlCommand.StepBackward,
      };

    case TerminalKey.D:
      return {
        type: InputMappingResultType.ReplayControl,
        replayControlCommand: ReplayControlCommand.ToggleDebriefOverlay,
      };

    default:
      return {
        type: InputMappingResultType.Ignored,
        reason: "Replay mode accepts only replay controls.",
      };
  }
};

const mapLiveMissionKey = (
  key: TerminalKey,
  context: KeyMappingContext,
): InputMappingResult => {
  const commandType = missionCommandTypeFromKey(key);

  if (commandType === null) {
    return {
      type: InputMappingResultType.Ignored,
      reason: "Key is not mapped to a live mission command.",
    };
  }

  return {
    type: InputMappingResultType.MissionCommand,
    command: buildMissionCommand(commandType, context),
  };
};

const missionCommandTypeFromKey = (
  key: TerminalKey,
): MissionCommandType | null => {
  switch (key) {
    case TerminalKey.ArrowUp:
      return MissionCommandType.IncreaseSpeed;

    case TerminalKey.ArrowDown:
      return MissionCommandType.DecreaseSpeed;

    case TerminalKey.ArrowLeft:
      return MissionCommandType.TurnLeft;

    case TerminalKey.ArrowRight:
      return MissionCommandType.TurnRight;

    case TerminalKey.W:
      return MissionCommandType.Climb;

    case TerminalKey.S:
      return MissionCommandType.Descend;

    case TerminalKey.R:
      return MissionCommandType.CycleRadarTarget;

    case TerminalKey.L:
      return MissionCommandType.AttemptLock;

    case TerminalKey.F:
      return MissionCommandType.FireWeapon;

    case TerminalKey.C:
      return MissionCommandType.DeployCountermeasure;

    case TerminalKey.P:
      return MissionCommandType.PauseMission;

    case TerminalKey.T:
      return MissionCommandType.ToggleTacticalOverlay;

    case TerminalKey.E:
      return MissionCommandType.ExpandEventPanel;

    case TerminalKey.Space:
    case TerminalKey.LeftBracket:
    case TerminalKey.RightBracket:
    case TerminalKey.D:
    case TerminalKey.Escape:
    case TerminalKey.Unsupported:
      return null;
  }
};

const buildMissionCommand = (
  commandType: MissionCommandType,
  context: KeyMappingContext,
): MissionCommand => {
  const base = {
    commandId: context.commandId,
    issuedAtTick: context.issuedAtTick,
    aircraftId: context.aircraftId,
  };

  if (
    commandType === MissionCommandType.AttemptLock ||
    commandType === MissionCommandType.FireWeapon
  ) {
    if (context.focusedTrackId === null || context.focusedTrackId === undefined) {
  return {
    ...base,
    type: commandType,
  };
}

return {
  ...base,
  type: commandType,
  targetTrackId: context.focusedTrackId,
};
  }

  return {
    ...base,
    type: commandType,
  };
};