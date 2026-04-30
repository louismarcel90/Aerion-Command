import { createMissile, MissileStatus } from "@aerion/domain";
import type { Missile } from "@aerion/domain";
import type { WeaponEnvelopeConfiguration } from "../authorization/weapon-envelope-configuration.js";
import { defaultWeaponEnvelopeConfiguration } from "../authorization/weapon-envelope-configuration.js";

export const advanceMissileLifecycle = (
  missile: Missile,
  configuration: WeaponEnvelopeConfiguration = defaultWeaponEnvelopeConfiguration,
): Missile => {
  if (
    missile.status === MissileStatus.ResolvedHit ||
    missile.status === MissileStatus.ResolvedMiss ||
    missile.status === MissileStatus.Destroyed
  ) {
    return missile;
  }

  const ticksSinceLaunch = missile.ticksSinceLaunch + 1;

  if (ticksSinceLaunch >= configuration.missileMaxLifetimeTicks) {
    return createMissile({
      ...missile,
      status: MissileStatus.ResolvedMiss,
      ticksSinceLaunch,
    });
  }

  if (ticksSinceLaunch >= configuration.missileArmDelayTicks) {
    return createMissile({
      ...missile,
      status: MissileStatus.Tracking,
      ticksSinceLaunch,
    });
  }

  return createMissile({
    ...missile,
    status: MissileStatus.Launched,
    ticksSinceLaunch,
  });
};