import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { SimulationEvent } from "@aerion/contracts";
import { AnomalySeverity } from "./anomaly-marker.js";
import type { AnomalyMarker } from "./anomaly-marker.js";

export const detectEventAnomalies = (
  events: readonly SimulationEvent[],
): readonly AnomalyMarker[] => {
  return events.flatMap((event) => {
    if (event.type === SimulationEventType.InvariantViolationDetected) {
      return [
        {
          tick: event.occurredAtTick,
          severity: AnomalySeverity.Critical,
          label: `Invariant violation detected: ${event.invariantName}`,
          reasonCode: event.reasonCode,
        },
      ];
    }

    if (event.reasonCode === ReasonCode.ReplayDriftDetected) {
      return [
        {
          tick: event.occurredAtTick,
          severity: AnomalySeverity.Critical,
          label: "Replay drift detected.",
          reasonCode: event.reasonCode,
        },
      ];
    }

    if (event.reasonCode === ReasonCode.ReplayChecksumMismatch) {
      return [
        {
          tick: event.occurredAtTick,
          severity: AnomalySeverity.Critical,
          label: "Replay checksum mismatch detected.",
          reasonCode: event.reasonCode,
        },
      ];
    }

    return [];
  });
};