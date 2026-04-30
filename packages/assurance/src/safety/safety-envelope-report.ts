import type { AircraftId } from "@aerion/contracts";
import type { FlightSafetyWarning } from "@aerion/flight-model";

export type AircraftSafetyEnvelopeReport = {
  readonly aircraftId: AircraftId;
  readonly warnings: readonly FlightSafetyWarning[];
};

export type SafetyEnvelopeReport = {
  readonly aircraftReports: readonly AircraftSafetyEnvelopeReport[];
  readonly warningCount: number;
};