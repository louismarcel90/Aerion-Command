import type { ReasonCode } from "@aerion/contracts";
import type { Aircraft, RadarTrack } from "@aerion/domain";

export type LockAttemptResult = {
  readonly aircraft: Aircraft;
  readonly track: RadarTrack | null;
  readonly acquired: boolean;
  readonly reasonCode: ReasonCode;
};