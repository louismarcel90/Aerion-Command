import type { ReasonCode } from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";

export type CountermeasureDecision = {
  readonly deployed: boolean;
  readonly aircraft: Aircraft;
  readonly effectiveness: number;
  readonly reasonCode: ReasonCode;
};