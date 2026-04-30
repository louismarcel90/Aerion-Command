import type { Missile } from "@aerion/domain";
import { computeStateDigest } from "../digest/compute-state-digest.js";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export const replaceMissiles = (
  state: AuthoritativeSimulationState,
  missiles: readonly Missile[],
): AuthoritativeSimulationState => {
  const { stateDigest, ...stateWithoutDigest } = state;
  void stateDigest;

  return {
    ...stateWithoutDigest,
    missiles,
    stateDigest: computeStateDigest({
      ...stateWithoutDigest,
      missiles,
    }),
  };
};