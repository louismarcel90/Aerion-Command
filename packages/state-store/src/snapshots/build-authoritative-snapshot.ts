import type { AuthoritativeSnapshot } from "@aerion/contracts";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export const buildAuthoritativeSnapshot = (
  state: AuthoritativeSimulationState,
): AuthoritativeSnapshot => {
  return {
    missionId: state.missionId,
    scenarioId: state.scenarioId,
    seed: state.seed,
    tick: state.tick,
    missionStatus: state.missionStatus,
    missionPhase: state.missionPhase,
    aircraft: state.aircraft.map((aircraft) => ({
      aircraftId: aircraft.aircraftId,
      callsign: aircraft.callsign,
      x: aircraft.position.x,
      y: aircraft.position.y,
      altitudeFeet: aircraft.position.altitudeFeet,
      speedKnots: aircraft.measurements.speedKnots,
      headingDegrees: aircraft.measurements.headingDegrees,
      fuelPercentage: aircraft.measurements.fuelPercentage,
      isDestroyed: aircraft.isDestroyed,
    })),
    snapshotDigest: state.stateDigest,
  };
};