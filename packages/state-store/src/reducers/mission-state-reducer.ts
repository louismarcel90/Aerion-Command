import type { MissionPhase, MissionStatus } from "@aerion/contracts";
import { computeStateDigest } from "../digest/compute-state-digest.js";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export const transitionMissionStatus = (
  state: AuthoritativeSimulationState,
  nextStatus: MissionStatus,
): AuthoritativeSimulationState => {
  return withUpdatedDigest({
    ...state,
    missionStatus: nextStatus,
  });
};

export const transitionMissionPhase = (
  state: AuthoritativeSimulationState,
  nextPhase: MissionPhase,
): AuthoritativeSimulationState => {
  return withUpdatedDigest({
    ...state,
    missionPhase: nextPhase,
  });
};

export const advanceStateTick = (
  state: AuthoritativeSimulationState,
): AuthoritativeSimulationState => {
  return withUpdatedDigest({
    ...state,
    tick: (state.tick + 1) as AuthoritativeSimulationState["tick"],
  });
};

const withUpdatedDigest = (
  state: Omit<AuthoritativeSimulationState, "stateDigest"> & {
    readonly stateDigest: AuthoritativeSimulationState["stateDigest"];
  },
): AuthoritativeSimulationState => {
  const { stateDigest, ...stateWithoutDigest } = state;
  void stateDigest;

  return {
    ...stateWithoutDigest,
    stateDigest: computeStateDigest(stateWithoutDigest),
  };
};