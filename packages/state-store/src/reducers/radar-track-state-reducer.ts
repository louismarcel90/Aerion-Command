import type { RadarTrack } from "@aerion/domain";
import { computeStateDigest } from "../digest/compute-state-digest.js";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export const replaceRadarTracks = (
  state: AuthoritativeSimulationState,
  radarTracks: readonly RadarTrack[],
): AuthoritativeSimulationState => {
  const { stateDigest, ...stateWithoutDigest } = state;
  void stateDigest;

  return {
    ...stateWithoutDigest,
    radarTracks,
    stateDigest: computeStateDigest({
      ...stateWithoutDigest,
      radarTracks,
    }),
  };
};