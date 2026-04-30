import { MissionStatus } from "@aerion/contracts";
import {
  verifyAircraftInventoryInvariant,
  verifyStaleTrackInvariant,
} from "@aerion/domain";
import type { DomainInvariantResult } from "@aerion/domain";
import type { AuthoritativeSimulationState } from "../state/authoritative-simulation-state.js";

export type StateIntegrityReport = {
  readonly passed: boolean;
  readonly checkedInvariantCount: number;
  readonly violations: readonly DomainInvariantResult[];
};

export const verifyStateIntegrity = (
  state: AuthoritativeSimulationState,
): StateIntegrityReport => {
  const aircraftResults = state.aircraft.map((aircraft) =>
    verifyAircraftInventoryInvariant(aircraft),
  );

  const trackResults = state.radarTracks.map((track) => verifyStaleTrackInvariant(track));

  const missionStatusResult = verifyCompletedMissionState(state);

  const allResults = [...aircraftResults, ...trackResults, missionStatusResult];
  const violations = allResults.filter((result) => !result.passed);

  return {
    passed: violations.length === 0,
    checkedInvariantCount: allResults.length,
    violations,
  };
};

const verifyCompletedMissionState = (
  state: AuthoritativeSimulationState,
): DomainInvariantResult => {
  const passed =
    state.missionStatus !== MissionStatus.Succeeded ||
    state.objectives.every((objective) => objective.status === "COMPLETED");

  return {
    passed,
    invariantName: "SUCCEEDED_MISSION_REQUIRES_COMPLETED_OBJECTIVES",
    message: passed
      ? "Succeeded mission has completed objectives."
      : "Mission cannot be marked as succeeded while objectives remain incomplete.",
  };
};