import type { FaultCode, SimulationTick } from "@aerion/contracts";
import type { DegradedModePolicy } from "../degraded/degraded-mode-policy.js";

export type DegradedOperationReport = {
  readonly tick: SimulationTick;
  readonly activeFaultCodes: readonly FaultCode[];
  readonly policy: DegradedModePolicy;
  readonly missionCanContinue: boolean;
  readonly operatorMessage: string;
};