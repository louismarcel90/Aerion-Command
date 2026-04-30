import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { AssuranceInvariantResult } from "./assurance-invariant.js";
import {
  verifyMissionCompletionInvariant,
  verifyTerminalMissionCommandInvariant,
} from "./mission-invariants.js";
import {
  verifyLockRequiresStableTrackInvariant,
  verifyStaleTrackConfidenceInvariant,
} from "./sensor-invariants.js";
import {
  verifyMissileResolutionInvariant,
  verifyWeaponInventoryInvariant,
} from "./weapon-invariants.js";

export type AssuranceInvariantCheck = (
  state: AuthoritativeSimulationState,
) => AssuranceInvariantResult;

export const assuranceInvariantRegistry: readonly AssuranceInvariantCheck[] = [
  verifyMissionCompletionInvariant,
  verifyTerminalMissionCommandInvariant,
  verifyWeaponInventoryInvariant,
  verifyMissileResolutionInvariant,
  verifyStaleTrackConfidenceInvariant,
  verifyLockRequiresStableTrackInvariant,
];

export const runAssuranceInvariants = (
  state: AuthoritativeSimulationState,
): readonly AssuranceInvariantResult[] => {
  return assuranceInvariantRegistry.map((check) => check(state));
};