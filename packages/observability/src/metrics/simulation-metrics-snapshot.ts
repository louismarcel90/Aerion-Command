import type { SimulationTick } from "@aerion/contracts";

export type SimulationMetricsSnapshot = {
  readonly tick: SimulationTick;
  readonly totalEvents: number;
  readonly commandEventCount: number;
  readonly faultEventCount: number;
  readonly replayEventCount: number;
  readonly anomalyCount: number;
};