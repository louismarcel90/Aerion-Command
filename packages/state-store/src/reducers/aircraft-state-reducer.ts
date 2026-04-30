import type { AircraftId } from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";
import { createAircraft } from "@aerion/domain";
import { computeStateDigest } from "../digest/compute-state-digest.js";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export const replaceAircraft = (
  state: AuthoritativeSimulationState,
  updatedAircraft: Aircraft,
): AuthoritativeSimulationState => {
  const aircraft = state.aircraft.map((aircraftItem) =>
    aircraftItem.aircraftId === updatedAircraft.aircraftId
      ? createAircraft(updatedAircraft)
      : aircraftItem,
  );

  return withUpdatedAircraft(state, aircraft);
};

export const removeAircraftById = (
  state: AuthoritativeSimulationState,
  aircraftId: AircraftId,
): AuthoritativeSimulationState => {
  const aircraft = state.aircraft.filter((aircraftItem) => aircraftItem.aircraftId !== aircraftId);

  return withUpdatedAircraft(state, aircraft);
};

const withUpdatedAircraft = (
  state: AuthoritativeSimulationState,
  aircraft: readonly Aircraft[],
): AuthoritativeSimulationState => {
  const stateWithoutDigest = {
    ...state,
    aircraft,
    stateDigest: undefined,
  };

  const { stateDigest: _previousDigest, ...digestibleState } = stateWithoutDigest;

  return {
    ...digestibleState,
    stateDigest: computeStateDigest(digestibleState),
  };
};