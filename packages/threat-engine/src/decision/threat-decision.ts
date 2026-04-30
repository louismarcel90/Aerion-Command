import type { ReasonCode } from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";
import type { FlightManeuverCommand } from "@aerion/flight-model";
import type { ThreatBehaviorState } from "../behavior/threat-behavior-state.js";

export type ThreatDecision = {
  readonly nextBehaviorState: ThreatBehaviorState;
  readonly maneuverCommand: FlightManeuverCommand;
  readonly updatedAircraft: Aircraft;
  readonly reasonCode: ReasonCode;
};