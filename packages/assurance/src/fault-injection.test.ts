import { describe, expect, it } from "vitest";
import { FaultCode, ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { EventId, MissionId } from "@aerion/contracts";
import {
  buildFaultInjectedEvent,
  createMultiFaultScenario,
  createRadarDegradationFaultScenario,
  evaluateDegradedOperation,
  evaluateFaultInjection,
  asSimulationTick,
} from "./index.js";

const asEventId = (value: string): EventId => {
  return value as EventId;
};

const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

describe("fault injection", () => {
  it("injects scheduled fault at exact tick", () => {
    const scenario = createRadarDegradationFaultScenario();

    const result = evaluateFaultInjection(scenario, asSimulationTick(3));

    expect(result.injectedFaultCodes).toEqual([FaultCode.RadarDegraded]);
    expect(result.activeFaultCodes).toEqual([FaultCode.RadarDegraded]);
    expect(result.reasonCode).toBe(ReasonCode.FaultInjected);
  });

  it("keeps fault active during duration window", () => {
    const scenario = createRadarDegradationFaultScenario();

    const result = evaluateFaultInjection(scenario, asSimulationTick(5));

    expect(result.injectedFaultCodes).toEqual([]);
    expect(result.activeFaultCodes).toEqual([FaultCode.RadarDegraded]);
    expect(result.reasonCode).toBe(ReasonCode.DegradedOperationsActive);
  });

  it("expires fault after duration window", () => {
    const scenario = createRadarDegradationFaultScenario();

    const result = evaluateFaultInjection(scenario, asSimulationTick(8));

    expect(result.activeFaultCodes).toEqual([]);
  });

  it("supports multiple overlapping faults", () => {
    const scenario = createMultiFaultScenario();

    const result = evaluateFaultInjection(scenario, asSimulationTick(4));

    expect(result.injectedFaultCodes).toEqual([FaultCode.HudPartial]);
    expect(result.activeFaultCodes).toEqual([
      FaultCode.RadarDegraded,
      FaultCode.HudPartial,
    ]);
  });

  it("builds fault injected simulation event", () => {
    const event = buildFaultInjectedEvent({
      eventId: asEventId("event-fault-1"),
      missionId: asMissionId("mission-001"),
      tick: asSimulationTick(3),
      faultCode: FaultCode.RadarDegraded,
    });

    expect(event.type).toBe(SimulationEventType.FaultInjected);
    if (event.type !== SimulationEventType.FaultInjected) {
  throw new Error("Expected fault injected event.");
}
    expect(event.reasonCode).toBe(ReasonCode.FaultInjected);
    expect(event.faultCode).toBe(FaultCode.RadarDegraded);
  });
});

describe("degraded operation evaluation", () => {
  it("evaluates degraded operation policy from active faults", () => {
    const report = evaluateDegradedOperation(asSimulationTick(4), [
      FaultCode.RadarDegraded,
      FaultCode.HudPartial,
    ]);

    expect(report.missionCanContinue).toBe(true);
    expect(report.policy.degradedCapabilities.length).toBeGreaterThan(0);
    expect(report.operatorMessage).toContain("Mission capabilities degraded");
  });
});