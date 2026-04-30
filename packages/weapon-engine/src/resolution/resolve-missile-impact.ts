import { ReasonCode } from "@aerion/contracts";
import type { Missile, RadarTrack } from "@aerion/domain";
import { createMissile, MissileStatus } from "@aerion/domain";
import type { WeaponEnvelopeConfiguration } from "../authorization/weapon-envelope-configuration.js";
import { defaultWeaponEnvelopeConfiguration } from "../authorization/weapon-envelope-configuration.js";
import type { MissileResolutionResult } from "./missile-resolution-result.js";

export type MissileResolutionInput = {
  readonly missile: Missile;
  readonly targetTrack: RadarTrack;
  readonly randomSample: number;
  readonly countermeasureEffectiveness: number;
  readonly configuration?: WeaponEnvelopeConfiguration;
};

export const resolveMissileImpact = (
  input: MissileResolutionInput,
): MissileResolutionResult => {
  const configuration = input.configuration ?? defaultWeaponEnvelopeConfiguration;

  if (input.missile.status !== MissileStatus.Tracking) {
    return {
      missile: input.missile,
      hit: false,
      reasonCode: ReasonCode.MissileMissedTargetEvasiveWindow,
    };
  }

  const confidenceBonus = input.targetTrack.confidencePercentage / 100;
  const countermeasurePenalty =
    input.countermeasureEffectiveness * configuration.countermeasurePenalty;

  const hitThreshold = Math.min(
    0.95,
    Math.max(0.05, configuration.baseHitThreshold + confidenceBonus * 0.18 - countermeasurePenalty),
  );

  const hit = input.randomSample <= hitThreshold;

  return {
    missile: createMissile({
      ...input.missile,
      status: hit ? MissileStatus.ResolvedHit : MissileStatus.ResolvedMiss,
    }),
    hit,
    reasonCode: hit
      ? ReasonCode.MissileHitConfirmed
      : input.countermeasureEffectiveness > 0
        ? ReasonCode.MissileMissedCountermeasureEffective
        : ReasonCode.MissileMissedTargetEvasiveWindow,
  };
};