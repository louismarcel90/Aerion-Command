import type { MissionCommand } from "@aerion/contracts";
import type { RuntimeContext } from "@aerion/mission-simulator";
import type { SimulationEvent } from "@aerion/contracts";

export type LiveTerminalState = {
  readonly context: RuntimeContext;
  readonly pendingCommands: readonly MissionCommand[];
  readonly accumulatedEvents: readonly SimulationEvent[];
  readonly running: boolean;
};