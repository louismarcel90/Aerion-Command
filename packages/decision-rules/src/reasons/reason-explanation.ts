import type { ReasonCode } from "@aerion/contracts";

export type ReasonExplanation = {
  readonly reasonCode: ReasonCode;
  readonly title: string;
  readonly explanation: string;
  readonly operatorGuidance: string;
};