import { createPlayerAircraftFixture } from "@aerion/domain";
import type { Aircraft } from "@aerion/domain";
import { createAircraft, createTacticalMeasurements, createTacticalPosition } from "@aerion/domain";

export const createFlightReadyAircraftFixture = (): Aircraft => {
  return createPlayerAircraftFixture();
};

export const createLowFuelAircraftFixture = (): Aircraft => {
  const aircraft = createPlayerAircraftFixture();

  return createAircraft({
    ...aircraft,
    measurements: createTacticalMeasurements({
      ...aircraft.measurements,
      fuelPercentage: 4,
    }),
  });
};

export const createBoundaryAircraftFixture = (): Aircraft => {
  const aircraft = createPlayerAircraftFixture();

  return createAircraft({
    ...aircraft,
    position: createTacticalPosition({
      x: 0,
      y: 0,
      altitudeFeet: aircraft.position.altitudeFeet,
    }),
    measurements: createTacticalMeasurements({
      ...aircraft.measurements,
      headingDegrees: 315,
    }),
  });
};