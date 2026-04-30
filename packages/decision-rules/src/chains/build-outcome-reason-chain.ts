import type { MissionId, ReasonCode, SimulationTick } from "@aerion/contracts";
import { explainReasonCode } from "../reasons/explain-reason-code.js";
import type { OutcomeReasonChain } from "./outcome-reason-chain.js";
// import type { OutcomeReasonChain } from "./outcome-reason-chain.js"; 

export type ReasonChainSourceEntry = {
  readonly tick: SimulationTick;
  readonly reasonCode: ReasonCode;
};

export const buildOutcomeReasonChain = (
  missionId: MissionId,
  title: string,
  entries: readonly ReasonChainSourceEntry[],
): OutcomeReasonChain => {
  return {
    missionId,
    title,
    entries: entries.map((entry): OutcomeReasonChain["entries"][number] => ({
    tick: entry.tick,
    reasonCode: entry.reasonCode,
    explanation: explainReasonCode(entry.reasonCode).explanation
})),
  };
};