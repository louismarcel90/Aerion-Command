export type ThreatBehaviorConfiguration = {
  readonly engageAggressionThreshold: number;
  readonly evadeWhenLocked: boolean;
  readonly retreatFuelThreshold: number;
  readonly retreatConfidenceThreshold: number;
  readonly aggressionGainWhenTargetVisible: number;
  readonly aggressionLossWhenNoTarget: number;
  readonly confidenceGainWhenTrackStable: number;
  readonly confidenceLossWhenTrackStale: number;
};

export const defaultThreatBehaviorConfiguration: ThreatBehaviorConfiguration = {
  engageAggressionThreshold: 70,
  evadeWhenLocked: true,
  retreatFuelThreshold: 12,
  retreatConfidenceThreshold: 20,
  aggressionGainWhenTargetVisible: 18,
  aggressionLossWhenNoTarget: 12,
  confidenceGainWhenTrackStable: 15,
  confidenceLossWhenTrackStale: 20,
};