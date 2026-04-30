import type { MissionCommand, SimulationTick } from "@aerion/contracts";

export type ScheduledCommand = {
  readonly scheduledForTick: SimulationTick;
  readonly command: MissionCommand;
};