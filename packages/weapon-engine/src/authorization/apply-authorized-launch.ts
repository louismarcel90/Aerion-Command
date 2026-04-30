import type { MissileId, SimulationTick } from "@aerion/contracts";
import type { Aircraft, Missile } from "@aerion/domain";
import { createAircraft } from "@aerion/domain";
import { createLaunchedMissile } from "../missile/create-launched-missile.js";
import type { WeaponCooldownState } from "../cooldown/weapon-cooldown-state.js";
import type { LaunchAuthorizationDecision } from "./launch-authorization-decision.js";

export type AuthorizedLaunchResult = {
  readonly aircraft: Aircraft;
  readonly missile: Missile | null;
  readonly cooldownState: WeaponCooldownState;
};

export const applyAuthorizedLaunch = (
  decision: LaunchAuthorizationDecision,
  missileId: MissileId,
  currentTick: SimulationTick,
): AuthorizedLaunchResult => {
  if (!decision.authorized || !decision.targetTrack) {
    return {
      aircraft: decision.sourceAircraft,
      missile: null,
      cooldownState: {
        aircraftId: decision.sourceAircraft.aircraftId,
        lastLaunchTick: null,
      },
    };
  }

  const aircraft = createAircraft({
    ...decision.sourceAircraft,
    missileInventory: decision.sourceAircraft.missileInventory - 1,
  });

  return {
    aircraft,
    missile: createLaunchedMissile(missileId, aircraft, decision.targetTrack),
    cooldownState: {
      aircraftId: aircraft.aircraftId,
      lastLaunchTick: currentTick,
    },
  };
};