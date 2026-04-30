import type { SimulationTick } from "@aerion/contracts";
import type { WeaponEnvelopeConfiguration } from "../authorization/weapon-envelope-configuration.js";
import { defaultWeaponEnvelopeConfiguration } from "../authorization/weapon-envelope-configuration.js";
import type { WeaponCooldownState } from "./weapon-cooldown-state.js";

export const isWeaponCooldownActive = (
  cooldownState: WeaponCooldownState,
  currentTick: SimulationTick,
  configuration: WeaponEnvelopeConfiguration = defaultWeaponEnvelopeConfiguration,
): boolean => {
  if (cooldownState.lastLaunchTick === null) {
    return false;
  }

  return currentTick - cooldownState.lastLaunchTick < configuration.launchCooldownTicks;
};