import { FaultCode } from "@aerion/contracts";
import type { SimulationTick } from "@aerion/contracts";
import type { FaultInjectionScenario } from "./fault-injection-scenario.js";

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createRadarDegradationFaultScenario = (): FaultInjectionScenario => {
  return {
    scenarioId: "fault-scenario-radar-degraded",
    label: "Radar degradation during contact window",
    scheduledFaults: [
      {
        faultCode: FaultCode.RadarDegraded,
        injectAtTick: asSimulationTick(3),
        durationTicks: 4,
      },
    ],
  };
};

export const createMultiFaultScenario = (): FaultInjectionScenario => {
  return {
    scenarioId: "fault-scenario-multi-degraded",
    label: "Radar degraded with partial HUD",
    scheduledFaults: [
      {
        faultCode: FaultCode.RadarDegraded,
        injectAtTick: asSimulationTick(2),
        durationTicks: 5,
      },
      {
        faultCode: FaultCode.HudPartial,
        injectAtTick: asSimulationTick(4),
        durationTicks: 3,
      },
    ],
  };
};