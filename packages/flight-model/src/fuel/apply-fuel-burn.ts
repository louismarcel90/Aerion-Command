import { createAircraft } from "@aerion/domain";
import type { Aircraft } from "@aerion/domain";
import { clampPercentage } from "@aerion/domain";
import type { FlightEnvelopeConstraints } from "../constraints/flight-envelope-constraints.js";

export const applyFuelBurn = (
  aircraft: Aircraft,
  constraints: FlightEnvelopeConstraints,
): Aircraft => {
  return createAircraft({
    ...aircraft,
    measurements: {
      ...aircraft.measurements,
      fuelPercentage: clampPercentage(
        aircraft.measurements.fuelPercentage - constraints.fuelBurnPerTick,
      ),
    },
  });
};