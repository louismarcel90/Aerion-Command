export type FlightEnvelopeConstraints = {
  readonly minSpeedKnots: number;
  readonly maxSpeedKnots: number;
  readonly speedStepKnots: number;
  readonly minAltitudeFeet: number;
  readonly maxAltitudeFeet: number;
  readonly altitudeStepFeet: number;
  readonly turnStepDegrees: number;
  readonly fuelBurnPerTick: number;
  readonly tacticalGridWidth: number;
  readonly tacticalGridHeight: number;
};

export const defaultFlightEnvelopeConstraints: FlightEnvelopeConstraints = {
  minSpeedKnots: 180,
  maxSpeedKnots: 900,
  speedStepKnots: 40,
  minAltitudeFeet: 1000,
  maxAltitudeFeet: 45000,
  altitudeStepFeet: 750,
  turnStepDegrees: 8,
  fuelBurnPerTick: 0.15,
  tacticalGridWidth: 80,
  tacticalGridHeight: 24,
};