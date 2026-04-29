import type {
  AircraftId,
  Digest,
  MissionId,
  ScenarioId,
  SimulationSeed,
  SimulationTick,
} from "../shared/branded-types.js";
import type { MissionPhase } from "../mission/mission-phase.js";
import type { MissionStatus } from "../mission/mission-status.js";

export type AircraftSnapshot = {
  readonly aircraftId: AircraftId;
  readonly callsign: string;
  readonly x: number;
  readonly y: number;
  readonly altitudeFeet: number;
  readonly speedKnots: number;
  readonly headingDegrees: number;
  readonly fuelPercentage: number;
  readonly isDestroyed: boolean;
};

export type AuthoritativeSnapshot = {
  readonly missionId: MissionId;
  readonly scenarioId: ScenarioId;
  readonly seed: SimulationSeed;
  readonly tick: SimulationTick;
  readonly missionStatus: MissionStatus;
  readonly missionPhase: MissionPhase;
  readonly aircraft: readonly AircraftSnapshot[];
  readonly snapshotDigest: Digest;
};