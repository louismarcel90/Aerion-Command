export type GridCoordinate = {
  readonly x: number;
  readonly y: number;
};

export type AltitudeFeet = number;
export type SpeedKnots = number;
export type HeadingDegrees = number;
export type FuelPercentage = number;

export type TacticalPosition = {
  readonly coordinate: GridCoordinate;
  readonly altitudeFeet: AltitudeFeet;
};

export type TacticalVector = {
  readonly headingDegrees: HeadingDegrees;
  readonly speedKnots: SpeedKnots;
};