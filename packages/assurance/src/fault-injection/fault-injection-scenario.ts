import type { FaultCode, SimulationTick } from "@aerion/contracts";

export type FaultInjectionScenario = {
  readonly scenarioId: string;
  readonly label: string;
  readonly scheduledFaults: readonly ScheduledFaultInjection[];
};

export type ScheduledFaultInjection = {
  readonly faultCode: FaultCode;
  readonly injectAtTick: SimulationTick;
  readonly durationTicks: number;
};