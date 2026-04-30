import type { FaultCode, SimulationTick } from "@aerion/contracts";

export type ScenarioFaultDefinition = {
  readonly faultCode: FaultCode;
  readonly injectAtTick: SimulationTick;
  readonly durationTicks: number;
};