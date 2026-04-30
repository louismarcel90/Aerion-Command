import type { ReasonCode } from "@aerion/contracts";
import type { Missile } from "@aerion/domain";

export type MissileResolutionResult = {
  readonly missile: Missile;
  readonly hit: boolean;
  readonly reasonCode: ReasonCode;
};