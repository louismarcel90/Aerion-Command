import type { FaultInjectionScenario } from "@aerion/assurance";
import type { MissionCommand } from "@aerion/contracts";

export type RuntimeLoopOptions = {
  readonly ticksToRun: number;
  readonly scheduledCommands: readonly MissionCommand[];
  readonly faultScenario: FaultInjectionScenario | null;
};