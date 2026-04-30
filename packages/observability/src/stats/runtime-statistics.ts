import type { SimulationTick } from "@aerion/contracts";

export type RuntimeStatistics = {
  readonly tick: SimulationTick;
  readonly tickDurationMs: number;
  readonly renderDurationMs: number;
  readonly replayStepDurationMs: number;
  readonly droppedFrameCount: number;
};