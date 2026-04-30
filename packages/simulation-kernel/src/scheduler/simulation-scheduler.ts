import type { MissionCommand, SimulationTick } from "@aerion/contracts";
import type { ScheduledCommand } from "./scheduled-command.js";

export type SimulationScheduler = {
  readonly scheduledCommands: readonly ScheduledCommand[];
};

export const createSimulationScheduler = (
  scheduledCommands: readonly ScheduledCommand[] = [],
): SimulationScheduler => {
  return {
    scheduledCommands: [...scheduledCommands].sort(compareScheduledCommands),
  };
};

export const scheduleCommand = (
  scheduler: SimulationScheduler,
  command: MissionCommand,
): SimulationScheduler => {
  return createSimulationScheduler([
    ...scheduler.scheduledCommands,
    {
      scheduledForTick: command.issuedAtTick,
      command,
    },
  ]);
};

export const collectCommandsForTick = (
  scheduler: SimulationScheduler,
  tick: SimulationTick,
): readonly MissionCommand[] => {
  return scheduler.scheduledCommands
    .filter((scheduledCommand) => scheduledCommand.scheduledForTick === tick)
    .map((scheduledCommand) => scheduledCommand.command);
};

export const removeCommandsForTick = (
  scheduler: SimulationScheduler,
  tick: SimulationTick,
): SimulationScheduler => {
  return createSimulationScheduler(
    scheduler.scheduledCommands.filter(
      (scheduledCommand) => scheduledCommand.scheduledForTick !== tick,
    ),
  );
};

const compareScheduledCommands = (
  left: ScheduledCommand,
  right: ScheduledCommand,
): number => {
  if (left.scheduledForTick !== right.scheduledForTick) {
    return left.scheduledForTick - right.scheduledForTick;
  }

  return left.command.commandId.localeCompare(right.command.commandId);
};