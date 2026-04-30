import type { MissionId, ReasonCode, SimulationTick } from "@aerion/contracts";

export const LogLevel = {
  Debug: "DEBUG",
  Info: "INFO",
  Warn: "WARN",
  Error: "ERROR",
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export type StructuredLogEntry = {
  readonly level: LogLevel;
  readonly missionId: MissionId;
  readonly tick: SimulationTick;
  readonly message: string;
  readonly reasonCode: ReasonCode | null;
};