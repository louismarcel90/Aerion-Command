export type TacticalMeasurements = {
  readonly speedKnots: number;
  readonly altitudeFeet: number;
  readonly headingDegrees: number;
  readonly fuelPercentage: number;
};

export const createTacticalMeasurements = (input: TacticalMeasurements): TacticalMeasurements => {
  return {
    speedKnots: Math.max(0, input.speedKnots),
    altitudeFeet: Math.max(0, input.altitudeFeet),
    headingDegrees: normalizeHeading(input.headingDegrees),
    fuelPercentage: clampPercentage(input.fuelPercentage),
  };
};

export const normalizeHeading = (headingDegrees: number): number => {
  const normalized = headingDegrees % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

export const clampPercentage = (value: number): number => {
  return Math.min(100, Math.max(0, value));
};