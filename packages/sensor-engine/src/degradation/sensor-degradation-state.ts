import type { FaultCode } from "@aerion/contracts";

export const SensorDegradationLevel = {
  Nominal: "NOMINAL",
  Degraded: "DEGRADED",
  Blackout: "BLACKOUT",
} as const;

export type SensorDegradationLevel =
  (typeof SensorDegradationLevel)[keyof typeof SensorDegradationLevel];

export type SensorDegradationState = {
  readonly level: SensorDegradationLevel;
  readonly activeFaultCodes: readonly FaultCode[];
};