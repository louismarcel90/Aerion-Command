import type { AircraftId } from "@aerion/contracts";

export const ThreatLevel = {
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
  Critical: "CRITICAL",
} as const;

export type ThreatLevel = (typeof ThreatLevel)[keyof typeof ThreatLevel];

export type ThreatEnvelope = {
  readonly aircraftId: AircraftId;
  readonly threatLevel: ThreatLevel;
  readonly distanceUnits: number;
  readonly isHostile: boolean;
  readonly isInsideDangerZone: boolean;
};

export const createThreatEnvelope = (input: ThreatEnvelope): ThreatEnvelope => {
  return {
    ...input,
    distanceUnits: Math.max(0, input.distanceUnits),
  };
};