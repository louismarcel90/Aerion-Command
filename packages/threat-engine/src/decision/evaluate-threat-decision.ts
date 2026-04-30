import type { Aircraft, RadarTrack } from "@aerion/domain";
import { applyFlightManeuver } from "@aerion/flight-model";
import type { ThreatBehaviorConfiguration } from "../behavior/threat-behavior-configuration.js";
import { defaultThreatBehaviorConfiguration } from "../behavior/threat-behavior-configuration.js";
import type { ThreatBehaviorState } from "../behavior/threat-behavior-state.js";
import { updateThreatBehavior } from "../behavior/update-threat-behavior.js";
import { planThreatManeuver } from "../maneuver/threat-maneuver-planner.js";
import { selectHighestConfidenceTarget } from "../targeting/threat-target-selection.js";
import type { ThreatDecision } from "./threat-decision.js";

export type ThreatDecisionInput = {
  readonly threatAircraft: Aircraft;
  readonly visibleTracks: readonly RadarTrack[];
  readonly isThreatLockedByOpponent: boolean;
  readonly behaviorState: ThreatBehaviorState;
  readonly configuration?: ThreatBehaviorConfiguration;
};

export const evaluateThreatDecision = (input: ThreatDecisionInput): ThreatDecision => {
  const configuration = input.configuration ?? defaultThreatBehaviorConfiguration;
  const targetSelection = selectHighestConfidenceTarget(input.visibleTracks);

  const behaviorUpdate = updateThreatBehavior(
    input.behaviorState,
    targetSelection.selectedTrack,
    input.isThreatLockedByOpponent,
    input.threatAircraft.measurements.fuelPercentage,
    configuration,
  );

  const maneuverCommand = planThreatManeuver(
    input.threatAircraft,
    targetSelection.selectedTrack,
    behaviorUpdate.nextBehaviorState.mode,
  );

  const maneuverResult = applyFlightManeuver(input.threatAircraft, maneuverCommand);

  return {
    nextBehaviorState: behaviorUpdate.nextBehaviorState,
    maneuverCommand,
    updatedAircraft: maneuverResult.aircraft,
    reasonCode: behaviorUpdate.reasonCode,
  };
};