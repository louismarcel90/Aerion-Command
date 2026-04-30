import type { Aircraft } from "@aerion/domain";
import { createAircraft, createTacticalPosition } from "@aerion/domain";
import type { FlightEnvelopeConstraints } from "../constraints/flight-envelope-constraints.js";

export type PositionProjectionResult = {
  readonly aircraft: Aircraft;
  readonly boundaryReached: boolean;
};

export const projectPosition = (
  aircraft: Aircraft,
  constraints: FlightEnvelopeConstraints,
): PositionProjectionResult => {
  const headingRadians = (aircraft.measurements.headingDegrees * Math.PI) / 180;
  const movementUnits = Math.max(1, Math.round(aircraft.measurements.speedKnots / 250));

  const nextX = aircraft.position.x + Math.round(Math.sin(headingRadians) * movementUnits);
  const nextY = aircraft.position.y - Math.round(Math.cos(headingRadians) * movementUnits);

  const boundedX = clampInteger(nextX, 0, constraints.tacticalGridWidth - 1);
  const boundedY = clampInteger(nextY, 0, constraints.tacticalGridHeight - 1);

  const boundaryReached = boundedX !== nextX || boundedY !== nextY;

  return {
    aircraft: createAircraft({
      ...aircraft,
      position: createTacticalPosition({
        x: boundedX,
        y: boundedY,
        altitudeFeet: aircraft.position.altitudeFeet,
      }),
    }),
    boundaryReached,
  };
};

const clampInteger = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};