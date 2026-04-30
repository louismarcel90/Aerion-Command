import type { ReasonCode, SimulationTick } from "@aerion/contracts";

export type MissionTimelineEntry = {
  readonly tick: SimulationTick;
  readonly label: string;
  readonly reasonCode: ReasonCode;
};