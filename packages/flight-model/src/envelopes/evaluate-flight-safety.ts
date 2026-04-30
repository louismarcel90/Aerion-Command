import type { Aircraft } from "@aerion/domain";
import type { FlightEnvelopeConstraints } from "../constraints/flight-envelope-constraints.js";
import { FlightSafetyWarning } from "../maneuver/flight-maneuver-result.js";
import type { FlightSafetyWarning as FlightSafetyWarningType } from "../maneuver/flight-maneuver-result.js";

export const evaluateFlightSafety = (
  aircraft: Aircraft,
  constraints: FlightEnvelopeConstraints,
  boundaryReached: boolean,
): readonly FlightSafetyWarningType[] => {
  const warnings: FlightSafetyWarningType[] = [];

  if (aircraft.measurements.fuelPercentage <= 10) {
    warnings.push(FlightSafetyWarning.FuelCritical);
  }

  if (aircraft.position.altitudeFeet <= constraints.minAltitudeFeet) {
    warnings.push(FlightSafetyWarning.MinimumAltitudeApproached);
  }

  if (aircraft.position.altitudeFeet >= constraints.maxAltitudeFeet) {
    warnings.push(FlightSafetyWarning.MaximumAltitudeReached);
  }

  if (aircraft.measurements.speedKnots <= constraints.minSpeedKnots) {
    warnings.push(FlightSafetyWarning.MinimumSpeedReached);
  }

  if (aircraft.measurements.speedKnots >= constraints.maxSpeedKnots) {
    warnings.push(FlightSafetyWarning.MaximumSpeedReached);
  }

  if (boundaryReached) {
    warnings.push(FlightSafetyWarning.TacticalBoundaryReached);
  }

  return warnings;
};