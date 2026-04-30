import type { ReasonCode } from "@aerion/contracts";

export const AssuranceSeverity = {
  Info: "INFO",
  Warning: "WARNING",
  Critical: "CRITICAL",
} as const;

export type AssuranceSeverity = (typeof AssuranceSeverity)[keyof typeof AssuranceSeverity];

export type AssuranceInvariantResult = {
  readonly invariantName: string;
  readonly passed: boolean;
  readonly severity: AssuranceSeverity;
  readonly message: string;
  readonly reasonCode: ReasonCode | null;
};