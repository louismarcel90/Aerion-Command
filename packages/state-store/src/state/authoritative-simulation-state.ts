import type {
  Digest,
  MissionId,
  MissionPhase,
  MissionStatus,
  ScenarioId,
  SimulationSeed,
  SimulationTick,
} from "@aerion/contracts";
import type { Aircraft, Missile, Alert, MissionObjective, RadarTrack } from "@aerion/domain";

export type AuthoritativeSimulationState = {
  readonly missionId: MissionId;
  readonly scenarioId: ScenarioId;
  readonly seed: SimulationSeed;
  readonly tick: SimulationTick;
  readonly missionStatus: MissionStatus;
  readonly missionPhase: MissionPhase;
  readonly aircraft: readonly Aircraft[];
  readonly missiles: readonly Missile[];
  readonly radarTracks: readonly RadarTrack[];
  readonly objectives: readonly MissionObjective[];
  readonly alerts: readonly Alert[];
  readonly stateDigest: Digest;
};