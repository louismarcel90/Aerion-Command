import { SimulationEventType } from "@aerion/contracts";
import type { SimulationEvent, SimulationTick } from "@aerion/contracts";
import { countSimulationEvents, getEventTypeCount } from "../counters/event-counter.js";
import { detectEventAnomalies } from "../anomalies/detect-event-anomalies.js";
import type { SimulationMetricsSnapshot } from "./simulation-metrics-snapshot.js";

export const buildMetricsSnapshot = (
  tick: SimulationTick,
  events: readonly SimulationEvent[],
): SimulationMetricsSnapshot => {
  const counter = countSimulationEvents(events);
  const anomalies = detectEventAnomalies(events);

  return {
    tick,
    totalEvents: counter.totalEvents,
    commandEventCount:
      getEventTypeCount(counter, SimulationEventType.CommandReceived) +
      getEventTypeCount(counter, SimulationEventType.CommandRejected),
    faultEventCount: getEventTypeCount(counter, SimulationEventType.FaultInjected),
    replayEventCount: getEventTypeCount(counter, SimulationEventType.ReplayVerificationCompleted),
    anomalyCount: anomalies.length,
  };
};