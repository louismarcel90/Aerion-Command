import type { SimulationEvent } from "@aerion/contracts";
import type { ReplayTimelineEntry } from "./replay-timeline-entry.js";

export const buildReplayTimeline = (
  events: readonly SimulationEvent[],
): readonly ReplayTimelineEntry[] => {
  return events.map((event) => ({
    tick: event.occurredAtTick,
    label: `${event.type}`,
    reasonCode: event.reasonCode,
  }));
};