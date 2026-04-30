import type { MissionObjective } from "@aerion/domain";
import { computeStateDigest } from "../digest/compute-state-digest.js";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export const replaceObjectives = (
  state: AuthoritativeSimulationState,
  objectives: readonly MissionObjective[],
): AuthoritativeSimulationState => {
  const { stateDigest, ...stateWithoutDigest } = state;
  void stateDigest;

  return {
    ...stateWithoutDigest,
    objectives,
    stateDigest: computeStateDigest({
      ...stateWithoutDigest,
      objectives,
    }),
  };
};