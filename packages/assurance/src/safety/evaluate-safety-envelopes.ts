import { defaultFlightEnvelopeConstraints, evaluateFlightSafety } from "@aerion/flight-model";
import type { FlightEnvelopeConstraints } from "@aerion/flight-model";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { SafetyEnvelopeReport } from "./safety-envelope-report.js";

export const evaluateSafetyEnvelopes = (
  state: AuthoritativeSimulationState,
  constraints: FlightEnvelopeConstraints = defaultFlightEnvelopeConstraints,
): SafetyEnvelopeReport => {
  const aircraftReports = state.aircraft.map((aircraft) => ({
    aircraftId: aircraft.aircraftId,
    warnings: evaluateFlightSafety(aircraft, constraints, false),
  }));

  return {
    aircraftReports,
    warningCount: aircraftReports.reduce(
      (count, report) => count + report.warnings.length,
      0,
    ),
  };
};