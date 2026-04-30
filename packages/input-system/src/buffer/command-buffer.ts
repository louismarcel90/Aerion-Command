import type { MissionCommand } from "@aerion/contracts";

export type CommandBuffer = {
  readonly commands: readonly MissionCommand[];
};

export const createCommandBuffer = (
  commands: readonly MissionCommand[] = [],
): CommandBuffer => {
  return {
    commands: [...commands].sort(compareCommands),
  };
};

export const appendCommandToBuffer = (
  buffer: CommandBuffer,
  command: MissionCommand,
): CommandBuffer => {
  return createCommandBuffer([...buffer.commands, command]);
};

export const drainCommandBuffer = (
  buffer: CommandBuffer,
): {
  readonly drainedCommands: readonly MissionCommand[];
  readonly nextBuffer: CommandBuffer;
} => {
  return {
    drainedCommands: buffer.commands,
    nextBuffer: createCommandBuffer(),
  };
};

const compareCommands = (
  left: MissionCommand,
  right: MissionCommand,
): number => {
  if (left.issuedAtTick !== right.issuedAtTick) {
    return left.issuedAtTick - right.issuedAtTick;
  }

  return left.commandId.localeCompare(right.commandId);
};