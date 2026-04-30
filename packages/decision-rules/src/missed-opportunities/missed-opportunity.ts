import type { ReasonCode, SimulationTick } from "@aerion/contracts";

export type MissedOpportunity = {
  readonly tick: SimulationTick;
  readonly label: string;
  readonly reasonCode: ReasonCode;
};