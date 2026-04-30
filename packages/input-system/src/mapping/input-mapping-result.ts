import type { MissionCommand } from "@aerion/contracts";
import type { ReplayControlCommand } from "./replay-control-command.js";

export const InputMappingResultType = {
  MissionCommand: "MISSION_COMMAND",
  ReplayControl: "REPLAY_CONTROL",
  ExitRequested: "EXIT_REQUESTED",
  Ignored: "IGNORED",
} as const;

export type InputMappingResultType =
  (typeof InputMappingResultType)[keyof typeof InputMappingResultType];

export type MissionCommandMappingResult = {
  readonly type: typeof InputMappingResultType.MissionCommand;
  readonly command: MissionCommand;
};

export type ReplayControlMappingResult = {
  readonly type: typeof InputMappingResultType.ReplayControl;
  readonly replayControlCommand: ReplayControlCommand;
};

export type ExitRequestedMappingResult = {
  readonly type: typeof InputMappingResultType.ExitRequested;
};

export type IgnoredInputMappingResult = {
  readonly type: typeof InputMappingResultType.Ignored;
  readonly reason: string;
};

export type InputMappingResult =
  | MissionCommandMappingResult
  | ReplayControlMappingResult
  | ExitRequestedMappingResult
  | IgnoredInputMappingResult;