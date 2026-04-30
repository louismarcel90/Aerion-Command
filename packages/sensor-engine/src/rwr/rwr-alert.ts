import type { AircraftId, ReasonCode } from "@aerion/contracts";

export const RwrAlertLevel = {
  None: "NONE",
  Search: "SEARCH",
  Tracking: "TRACKING",
  Spike: "SPIKE",
} as const;

export type RwrAlertLevel = (typeof RwrAlertLevel)[keyof typeof RwrAlertLevel];

export type RwrAlert = {
  readonly aircraftId: AircraftId;
  readonly level: RwrAlertLevel;
  readonly label: string;
  readonly reasonCode: ReasonCode;
};