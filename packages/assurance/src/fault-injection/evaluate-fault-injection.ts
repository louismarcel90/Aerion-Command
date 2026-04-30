import { ReasonCode } from "@aerion/contracts";
import type { SimulationTick } from "@aerion/contracts";
import type { FaultInjectionScenario } from "./fault-injection-scenario.js";
import type { FaultInjectionResult } from "./fault-injection-result.js";

export const evaluateFaultInjection = (
  scenario: FaultInjectionScenario,
  tick: SimulationTick,
): FaultInjectionResult => {
  const activeFaultCodes = scenario.scheduledFaults
    .filter((fault) => isFaultActiveAtTick(fault.injectAtTick, fault.durationTicks, tick))
    .map((fault) => fault.faultCode);

  const injectedFaultCodes = scenario.scheduledFaults
    .filter((fault) => fault.injectAtTick === tick)
    .map((fault) => fault.faultCode);

  return {
    tick,
    activeFaultCodes,
    injectedFaultCodes,
    reasonCode:
      injectedFaultCodes.length > 0
        ? ReasonCode.FaultInjected
        : ReasonCode.DegradedOperationsActive,
  };
};

const isFaultActiveAtTick = (
  injectAtTick: SimulationTick,
  durationTicks: number,
  tick: SimulationTick,
): boolean => {
  return tick >= injectAtTick && tick < injectAtTick + durationTicks;
};