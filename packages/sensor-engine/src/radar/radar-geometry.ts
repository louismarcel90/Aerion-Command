import type { Aircraft } from "@aerion/domain";

export type RadarGeometryResult = {
  readonly distanceUnits: number;
  readonly angleOffNoseDegrees: number;
  readonly insideRange: boolean;
  readonly insideSensorArc: boolean;
};

export const evaluateRadarGeometry = (
  sourceAircraft: Aircraft,
  targetAircraft: Aircraft,
  maxRangeUnits: number,
  sensorArcDegrees: number,
): RadarGeometryResult => {
  const deltaX = targetAircraft.position.x - sourceAircraft.position.x;
  const deltaY = targetAircraft.position.y - sourceAircraft.position.y;

  const distanceUnits = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const bearingDegrees = normalizeDegrees((Math.atan2(deltaX, -deltaY) * 180) / Math.PI);
  const angleOffNoseDegrees = smallestAngleDifference(
    sourceAircraft.measurements.headingDegrees,
    bearingDegrees,
  );

  return {
    distanceUnits,
    angleOffNoseDegrees,
    insideRange: distanceUnits <= maxRangeUnits,
    insideSensorArc: angleOffNoseDegrees <= sensorArcDegrees / 2,
  };
};

const normalizeDegrees = (degrees: number): number => {
  const normalized = degrees % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const smallestAngleDifference = (leftDegrees: number, rightDegrees: number): number => {
  const diff = Math.abs(normalizeDegrees(leftDegrees) - normalizeDegrees(rightDegrees));
  return Math.min(diff, 360 - diff);
};