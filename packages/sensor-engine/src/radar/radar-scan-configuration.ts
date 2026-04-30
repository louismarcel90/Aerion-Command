export type RadarScanConfiguration = {
  readonly maxDetectionRangeUnits: number;
  readonly lockRangeUnits: number;
  readonly sensorArcDegrees: number;
  readonly baseDetectionConfidence: number;
  readonly confidenceGainPerScan: number;
  readonly confidenceLossWhenStale: number;
  readonly staleAfterTicks: number;
  readonly lostAfterTicks: number;
};

export const defaultRadarScanConfiguration: RadarScanConfiguration = {
  maxDetectionRangeUnits: 32,
  lockRangeUnits: 22,
  sensorArcDegrees: 120,
  baseDetectionConfidence: 45,
  confidenceGainPerScan: 18,
  confidenceLossWhenStale: 22,
  staleAfterTicks: 3,
  lostAfterTicks: 6,
};