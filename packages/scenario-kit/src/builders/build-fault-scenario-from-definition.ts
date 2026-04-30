import type { FaultInjectionScenario } from "@aerion/assurance";
import type { ScenarioDefinition } from "../schema/scenario-definition.js";

export const buildFaultScenarioFromDefinition = (
  scenario: ScenarioDefinition,
): FaultInjectionScenario => {
  return {
    scenarioId: `${scenario.metadata.scenarioId}-faults`,
    label: `${scenario.metadata.title} faults`,
    scheduledFaults: scenario.faults.map((fault) => ({
      faultCode: fault.faultCode,
      injectAtTick: fault.injectAtTick,
      durationTicks: fault.durationTicks,
    })),
  };
};