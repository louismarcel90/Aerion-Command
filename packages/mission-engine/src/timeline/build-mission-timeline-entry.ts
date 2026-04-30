import type { ReasonCode, SimulationTick } from "@aerion/contracts";
import type { MissionTimelineEntry } from "./mission-timeline-entry.js";

export const buildMissionTimelineEntry = (
  tick: SimulationTick,
  label: string,
  reasonCode: ReasonCode,
): MissionTimelineEntry => {
  return {
    tick,
    label,
    reasonCode,
  };
};