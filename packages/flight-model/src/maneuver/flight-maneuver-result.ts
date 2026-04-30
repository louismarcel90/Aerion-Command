import type { ReasonCode } from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";

export type FlightManeuverResult = {
  readonly aircraft: Aircraft;
  readonly reasonCodes: readonly ReasonCode[];
  readonly safetyWarnings: readonly FlightSafetyWarning[];
};

export const FlightSafetyWarning = {
  FuelCritical: "FUEL_CRITICAL",
  MinimumAltitudeApproached: "MINIMUM_ALTITUDE_APPROACHED",
  MaximumAltitudeReached: "MAXIMUM_ALTITUDE_REACHED",
  MinimumSpeedReached: "MINIMUM_SPEED_REACHED",
  MaximumSpeedReached: "MAXIMUM_SPEED_REACHED",
  TacticalBoundaryReached: "TACTICAL_BOUNDARY_REACHED",
} as const;

export type FlightSafetyWarning =
  (typeof FlightSafetyWarning)[keyof typeof FlightSafetyWarning];