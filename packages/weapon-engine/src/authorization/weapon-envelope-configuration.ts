export type WeaponEnvelopeConfiguration = {
  readonly minLaunchRangeUnits: number;
  readonly maxLaunchRangeUnits: number;
  readonly maxAngleOffNoseDegrees: number;
  readonly requiredConfidencePercentage: number;
  readonly launchCooldownTicks: number;
  readonly missileArmDelayTicks: number;
  readonly missileMaxLifetimeTicks: number;
  readonly baseHitThreshold: number;
  readonly countermeasurePenalty: number;
};

export const defaultWeaponEnvelopeConfiguration: WeaponEnvelopeConfiguration = {
  minLaunchRangeUnits: 2,
  maxLaunchRangeUnits: 24,
  maxAngleOffNoseDegrees: 35,
  requiredConfidencePercentage: 70,
  launchCooldownTicks: 4,
  missileArmDelayTicks: 2,
  missileMaxLifetimeTicks: 8,
  baseHitThreshold: 0.62,
  countermeasurePenalty: 0.28,
};