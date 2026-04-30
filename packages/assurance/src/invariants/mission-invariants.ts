import { MissionStatus, ReasonCode } from "@aerion/contracts";
import { MissionObjectiveStatus } from "@aerion/domain";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import { AssuranceSeverity } from "./assurance-invariant.js";
import type { AssuranceInvariantResult } from "./assurance-invariant.js";

export const verifyMissionCompletionInvariant = (
  state: AuthoritativeSimulationState,
): AssuranceInvariantResult => {
  const passed =
    state.missionStatus !== MissionStatus.Succeeded ||
    state.objectives.every((objective) => objective.status === MissionObjectiveStatus.Completed);

  return {
    invariantName: "MISSION_COMPLETION_REQUIRES_COMPLETED_OBJECTIVES",
    passed,
    severity: passed ? AssuranceSeverity.Info : AssuranceSeverity.Critical,
    message: passed
      ? "Mission completion invariant passed."
      : "Mission cannot be succeeded while objectives remain incomplete.",
    reasonCode: passed ? null : ReasonCode.MissionSucceededObjectiveComplete,
  };
};

export const verifyTerminalMissionCommandInvariant = (
  state: AuthoritativeSimulationState,
): AssuranceInvariantResult => {
  const passed =
    state.missionStatus !== MissionStatus.Succeeded &&
    state.missionStatus !== MissionStatus.Failed &&
    state.missionStatus !== MissionStatus.Aborted;

  return {
    invariantName: "TERMINAL_MISSION_MUST_NOT_ACCEPT_LIVE_COMMANDS",
    passed,
    severity: passed ? AssuranceSeverity.Info : AssuranceSeverity.Warning,
    message: passed
      ? "Mission is not terminal and may accept live commands."
      : "Mission is terminal and must reject live commands.",
    reasonCode: passed ? null : ReasonCode.CommandRejectedMissionTerminated,
  };
};