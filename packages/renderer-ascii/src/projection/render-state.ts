import type { MissionPhase, MissionStatus, SimulationTick } from "@aerion/contracts";
import type { DegradedModePolicy } from "@aerion/assurance";

export type RenderAircraft = {
  readonly callsign: string;
  readonly role: "PLAYER" | "ESCORT" | "ENEMY" | "NEUTRAL";
  readonly x: number;
  readonly y: number;
  readonly altitudeFeet: number;
  readonly speedKnots: number;
  readonly headingDegrees: number;
  readonly fuelPercentage: number;
  readonly isDestroyed: boolean;
};

export type RenderTrack = {
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly confidencePercentage: number;
  readonly status: string;
};

export type RenderMissile = {
  readonly label: string;
  readonly x: number;
  readonly y: number;
};

export type RenderEvent = {
  readonly tick: SimulationTick;
  readonly label: string;
};

export type RenderState = {
  readonly missionLabel: string;
  readonly missionStatus: MissionStatus;
  readonly missionPhase: MissionPhase;
  readonly tick: SimulationTick;
  readonly modeLabel: string;
  readonly aircraft: readonly RenderAircraft[];
  readonly tracks: readonly RenderTrack[];
  readonly missiles: readonly RenderMissile[];
  readonly alerts: readonly string[];
  readonly events: readonly RenderEvent[];
  readonly degradedModePolicy: DegradedModePolicy | null;
};