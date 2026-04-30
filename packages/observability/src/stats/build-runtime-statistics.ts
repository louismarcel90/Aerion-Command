import type { SimulationTick } from "@aerion/contracts";
import type { RuntimeStatistics } from "./runtime-statistics.js";

export type RuntimeStatisticsInput = {
  readonly tick: SimulationTick;
  readonly tickDurationMs: number;
  readonly renderDurationMs: number;
  readonly replayStepDurationMs: number;
  readonly droppedFrameCount: number;
};

export const buildRuntimeStatistics = (
  input: RuntimeStatisticsInput,
): RuntimeStatistics => {
  return {
    tick: input.tick,
    tickDurationMs: Math.max(0, input.tickDurationMs),
    renderDurationMs: Math.max(0, input.renderDurationMs),
    replayStepDurationMs: Math.max(0, input.replayStepDurationMs),
    droppedFrameCount: Math.max(0, input.droppedFrameCount),
  };
};