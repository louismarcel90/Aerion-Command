import { FaultCode } from "@aerion/contracts";
import { DegradedCapability } from "./degraded-mode-policy.js";
import type { DegradedModePolicy } from "./degraded-mode-policy.js";

export const evaluateDegradedModePolicy = (
  activeFaultCodes: readonly FaultCode[],
): DegradedModePolicy => {
  const unavailableCapabilities: DegradedCapability[] = [];
  const degradedCapabilities: DegradedCapability[] = [];

  if (activeFaultCodes.includes(FaultCode.RadarBlackout)) {
    unavailableCapabilities.push(DegradedCapability.RadarTracking);
    unavailableCapabilities.push(DegradedCapability.RadarLock);
  }

  if (activeFaultCodes.includes(FaultCode.RadarDegraded)) {
    degradedCapabilities.push(DegradedCapability.RadarTracking);
    degradedCapabilities.push(DegradedCapability.RadarLock);
  }

  if (activeFaultCodes.includes(FaultCode.RwrIntermittent)) {
    degradedCapabilities.push(DegradedCapability.RwrWarning);
  }

  if (activeFaultCodes.includes(FaultCode.HudPartial)) {
    degradedCapabilities.push(DegradedCapability.HudFullDisplay);
  }

  return {
    activeFaultCodes,
    unavailableCapabilities,
    degradedCapabilities,
    operatorMessage: buildOperatorMessage(unavailableCapabilities, degradedCapabilities),
  };
};

const buildOperatorMessage = (
  unavailableCapabilities: readonly DegradedCapability[],
  degradedCapabilities: readonly DegradedCapability[],
): string => {
  if (unavailableCapabilities.length === 0 && degradedCapabilities.length === 0) {
    return "All mission capabilities nominal.";
  }

  return `Mission capabilities degraded. Unavailable: ${unavailableCapabilities.length}. Degraded: ${degradedCapabilities.length}.`;
};