import { DegradedCapability } from "../degraded/degraded-mode-policy.js";
import { evaluateDegradedModePolicy } from "../degraded/evaluate-degraded-mode-policy.js";
import type { FaultCode, SimulationTick } from "@aerion/contracts";
import type { DegradedOperationReport } from "./degraded-operation-report.js";

export const evaluateDegradedOperation = (
  tick: SimulationTick,
  activeFaultCodes: readonly FaultCode[],
): DegradedOperationReport => {
  const policy = evaluateDegradedModePolicy(activeFaultCodes);

  const missionCanContinue = !policy.unavailableCapabilities.includes(
    DegradedCapability.ReplayVerification,
  );

  return {
    tick,
    activeFaultCodes,
    policy,
    missionCanContinue,
    operatorMessage: missionCanContinue
      ? policy.operatorMessage
      : "Mission should stop because required assurance capability is unavailable.",
  };
};