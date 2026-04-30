import { MissionPhase, ReasonCode } from "@aerion/contracts";
import type { AuthoritativeSimulationState } from "@aerion/state-store";

export const evaluateMissionPhase = (
  state: AuthoritativeSimulationState,
): {
  readonly nextPhase: MissionPhase;
  readonly changed: boolean;
  readonly reasonCode: ReasonCode | null;
} => {
  if (state.missionPhase === MissionPhase.Briefing && state.tick >= 1) {
    return {
      nextPhase: MissionPhase.Ingress,
      changed: true,
      reasonCode: ReasonCode.MissionStarted,
    };
  }

  if (state.missionPhase === MissionPhase.Ingress && state.radarTracks.length > 0) {
    return {
      nextPhase: MissionPhase.Contact,
      changed: true,
      reasonCode: ReasonCode.MissionPhaseAdvancedContact,
    };
  }

  if (
    state.missionPhase === MissionPhase.Contact &&
    state.radarTracks.some((track) => track.status === "LOCKED")
  ) {
    return {
      nextPhase: MissionPhase.Engagement,
      changed: true,
      reasonCode: ReasonCode.MissionPhaseAdvancedEngagement,
    };
  }

  if (
    state.missionPhase === MissionPhase.Engagement &&
    state.missiles.some((missile) => missile.status === "RESOLVED_HIT")
  ) {
    return {
      nextPhase: MissionPhase.Egress,
      changed: true,
      reasonCode: ReasonCode.MissionPhaseAdvancedEgress,
    };
  }

  return {
    nextPhase: state.missionPhase,
    changed: false,
    reasonCode: null,
  };
};