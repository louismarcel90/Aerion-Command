import type { ReasonCode } from "@aerion/contracts";
import type { RadarTrack } from "@aerion/domain";

export type RadarScanResult = {
  readonly tracks: readonly RadarTrack[];
  readonly reasonCodes: readonly ReasonCode[];
};