import type { ReasonCode, SimulationTick } from "@aerion/contracts";

export const AnomalySeverity = {
  Warning: "WARNING",
  Critical: "CRITICAL",
} as const;

export type AnomalySeverity = (typeof AnomalySeverity)[keyof typeof AnomalySeverity];

export type AnomalyMarker = {
  readonly tick: SimulationTick;
  readonly severity: AnomalySeverity;
  readonly label: string;
  readonly reasonCode: ReasonCode;
};