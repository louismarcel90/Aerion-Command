import { MissionStatus, ReasonCode } from "@aerion/contracts";
import type { MissionCommand, ReasonCode as ReasonCodeType } from "@aerion/contracts";

export type InputCommandValidationContext = {
  readonly missionStatus: MissionStatus;
  readonly replayModeActive: boolean;
};

export type InputCommandValidationResult = {
  readonly accepted: boolean;
  readonly command: MissionCommand;
  readonly reasonCode: ReasonCodeType;
};

export const validateInputCommand = (
  command: MissionCommand,
  context: InputCommandValidationContext,
): InputCommandValidationResult => {
  if (context.replayModeActive) {
    return {
      accepted: false,
      command,
      reasonCode: ReasonCode.CommandRejectedReplayModeReadOnly,
    };
  }

  if (
    context.missionStatus === MissionStatus.Succeeded ||
    context.missionStatus === MissionStatus.Failed ||
    context.missionStatus === MissionStatus.Aborted
  ) {
    return {
      accepted: false,
      command,
      reasonCode: ReasonCode.CommandRejectedMissionTerminated,
    };
  }

  return {
    accepted: true,
    command,
    reasonCode: ReasonCode.CommandAccepted,
  };
};