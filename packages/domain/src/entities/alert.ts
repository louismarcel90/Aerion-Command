import type { FaultCode, ReasonCode, SimulationTick } from "@aerion/contracts";

export const AlertSeverity = {
  Info: "INFO",
  Warning: "WARNING",
  Critical: "CRITICAL",
} as const;

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];

export type Alert = {
  readonly alertId: string;
  readonly severity: AlertSeverity;
  readonly label: string;
  readonly raisedAtTick: SimulationTick;
  readonly reasonCode?: ReasonCode;
  readonly faultCode?: FaultCode;
};

export const createAlert = (input: Alert): Alert => {
  return {
    ...input,
  };
};