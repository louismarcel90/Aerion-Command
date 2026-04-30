import { FaultCode } from "@aerion/contracts";
import type { MissionCommand } from "@aerion/contracts";

export type CommandPathFaultResult = {
  readonly acceptedCommands: readonly MissionCommand[];
  readonly droppedCommands: readonly MissionCommand[];
  readonly delayedCommands: readonly MissionCommand[];
};

export const applyCommandPathFaults = (
  commands: readonly MissionCommand[],
  activeFaultCodes: readonly FaultCode[],
): CommandPathFaultResult => {
  if (activeFaultCodes.includes(FaultCode.CommandDropped)) {
    const droppedCommand = commands[0];

    return {
      acceptedCommands: droppedCommand === undefined ? [] : commands.slice(1),
      droppedCommands: droppedCommand === undefined ? [] : [droppedCommand],
      delayedCommands: [],
    };
  }

  if (activeFaultCodes.includes(FaultCode.CommandDelayed)) {
    return {
      acceptedCommands: [],
      droppedCommands: [],
      delayedCommands: commands,
    };
  }

  return {
    acceptedCommands: commands,
    droppedCommands: [],
    delayedCommands: [],
  };
};