import { ReasonCode } from "@aerion/contracts";
import { MissileStatus } from "@aerion/domain";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import { AssuranceSeverity } from "./assurance-invariant.js";
import type { AssuranceInvariantResult } from "./assurance-invariant.js";

export const verifyMissileResolutionInvariant = (
  state: AuthoritativeSimulationState,
): AssuranceInvariantResult => {
  const invalidMissile = state.missiles.find(
    (missile) =>
      missile.status === MissileStatus.Destroyed &&
      missile.ticksSinceLaunch < 0,
  );

  const passed = invalidMissile === undefined;

  return {
    invariantName: "DESTROYED_MISSILE_LIFETIME_MUST_BE_VALID",
    passed,
    severity: passed ? AssuranceSeverity.Info : AssuranceSeverity.Critical,
    message: passed
      ? "Missile lifecycle invariant passed."
      : "Destroyed missile cannot contain invalid lifetime state.",
    reasonCode: passed ? null : ReasonCode.MissileMissedTargetEvasiveWindow,
  };
};

export const verifyWeaponInventoryInvariant = (
  state: AuthoritativeSimulationState,
): AssuranceInvariantResult => {
  const invalidAircraft = state.aircraft.find(
    (aircraft) => aircraft.missileInventory < 0 || aircraft.countermeasureCount < 0,
  );

  const passed = invalidAircraft === undefined;

  return {
    invariantName: "WEAPON_AND_COUNTERMEASURE_INVENTORY_NON_NEGATIVE",
    passed,
    severity: passed ? AssuranceSeverity.Info : AssuranceSeverity.Critical,
    message: passed
      ? "Weapon inventory invariant passed."
      : "Aircraft inventory cannot contain negative weapon or countermeasure values.",
    reasonCode: passed ? null : ReasonCode.LaunchRefusedNoInventory,
  };
};