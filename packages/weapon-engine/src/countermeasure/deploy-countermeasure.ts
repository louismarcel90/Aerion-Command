import { ReasonCode } from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";
import { createAircraft } from "@aerion/domain";
import type { CountermeasureDecision } from "./countermeasure-decision.js";

export const deployCountermeasure = (aircraft: Aircraft): CountermeasureDecision => {
  if (aircraft.countermeasureCount <= 0) {
    return {
      deployed: false,
      aircraft,
      effectiveness: 0,
      reasonCode: ReasonCode.CommandRejectedActionCooldownActive,
    };
  }

  return {
    deployed: true,
    aircraft: createAircraft({
      ...aircraft,
      countermeasureCount: aircraft.countermeasureCount - 1,
    }),
    effectiveness: 1,
    reasonCode: ReasonCode.CommandAccepted,
  };
};