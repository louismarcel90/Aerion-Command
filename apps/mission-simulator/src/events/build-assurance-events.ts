import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { AssuranceReport } from "@aerion/assurance";
import type { MissionId, SimulationEvent, SimulationTick } from "@aerion/contracts";
import { buildRuntimeEventId } from "./runtime-event-id.js";

export const buildInvariantViolationEvents = (
  missionId: MissionId,
  tick: SimulationTick,
  assuranceReport: AssuranceReport,
): readonly SimulationEvent[] => {
  return assuranceReport.invariantResults
    .filter((result) => !result.passed)
    .map((result, index) => ({
      eventId: buildRuntimeEventId("invariant-violation", tick, index),
      missionId,
      occurredAtTick: tick,
      type: SimulationEventType.InvariantViolationDetected,
      invariantName: result.invariantName,
      reasonCode: result.reasonCode ?? ReasonCode.ReplayDriftDetected,
    }));
};