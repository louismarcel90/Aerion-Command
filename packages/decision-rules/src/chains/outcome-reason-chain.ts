import type { MissionId, ReasonCode, SimulationTick } from "@aerion/contracts";

export type OutcomeReasonChainEntry = {
  readonly tick: SimulationTick;
  readonly reasonCode: ReasonCode;
  readonly explanation: string;
};

export type OutcomeReasonChain = {
  readonly missionId: MissionId;
  readonly title: string;
  readonly entries: readonly OutcomeReasonChainEntry[];
};