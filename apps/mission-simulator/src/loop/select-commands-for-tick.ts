import type { MissionCommand, SimulationTick } from "@aerion/contracts";

export const selectCommandsForTick = (
  commands: readonly MissionCommand[],
  tick: SimulationTick,
): readonly MissionCommand[] => {
  return commands.filter((command) => command.issuedAtTick === tick);
};