import { describe, expect, it } from "vitest";
import { FaultCode, SimulationEventType } from "@aerion/contracts";
import { createRuntimeContext } from "./runtime/create-runtime-context.js";
import { runRuntimeLoop } from "./loop/run-runtime-loop.js";
import {
  asMissionId,
  createRuntimeCommandSequenceFixture,
  createRuntimeFaultScenarioFixture,
  createRuntimeScenarioFixture,
} from "./fixtures/runtime-fixtures.js";

describe("runtime event quality", () => {
  it("emits command received events from scheduled commands", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-event-quality-001"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 2,
      scheduledCommands: createRuntimeCommandSequenceFixture(),
      faultScenario: null,
    });

    expect(
      result.accumulatedEvents.some(
        (event) => event.type === SimulationEventType.CommandReceived,
      ),
    ).toBe(true);
  });

  it("emits fault injected events from fault scenario", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-event-quality-002"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 3,
      scheduledCommands: [],
      faultScenario: createRuntimeFaultScenarioFixture(),
    });

    expect(
      result.accumulatedEvents.some(
        (event) =>
          event.type === SimulationEventType.FaultInjected &&
          event.faultCode === FaultCode.RadarDegraded,
      ),
    ).toBe(true);
  });

  it("emits aircraft state changed events", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-event-quality-003"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 1,
      scheduledCommands: [],
      faultScenario: null,
    });

    expect(
      result.accumulatedEvents.some(
        (event) => event.type === SimulationEventType.AircraftStateChanged,
      ),
    ).toBe(true);
  });

  it("emits radar track detected events when target is visible", () => {
    const context = createRuntimeContext({
      missionId: asMissionId("mission-event-quality-004"),
      scenario: createRuntimeScenarioFixture(),
    });

    const result = runRuntimeLoop(context, {
      ticksToRun: 2,
      scheduledCommands: [],
      faultScenario: null,
    });

    expect(
      result.accumulatedEvents.some(
        (event) => event.type === SimulationEventType.RadarTrackDetected,
      ),
    ).toBe(true);
  });
});