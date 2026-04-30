import type { MissionId, ReasonCode, SimulationTick } from "@aerion/contracts";
import type { LogLevel, StructuredLogEntry } from "./structured-log-entry.js";

export const buildLogEntry = (
  level: LogLevel,
  missionId: MissionId,
  tick: SimulationTick,
  message: string,
  reasonCode: ReasonCode | null,
): StructuredLogEntry => {
  return {
    level,
    missionId,
    tick,
    message,
    reasonCode,
  };
};