import type { FaultCode, ReasonCode, SimulationTick } from "@aerion/contracts";

export type FaultInjectionResult = {
  readonly tick: SimulationTick;
  readonly activeFaultCodes: readonly FaultCode[];
  readonly injectedFaultCodes: readonly FaultCode[];
  readonly reasonCode: ReasonCode;
};