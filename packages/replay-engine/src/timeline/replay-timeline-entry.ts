import type { ReasonCode, SimulationTick } from "@aerion/contracts";

export type ReplayTimelineEntry = {
  readonly tick: SimulationTick;
  readonly label: string;
  readonly reasonCode: ReasonCode;
};