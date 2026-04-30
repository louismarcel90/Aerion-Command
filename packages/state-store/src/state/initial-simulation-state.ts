import { MissionPhase, MissionStatus } from "@aerion/contracts";
import type {
  Digest,
  MissionId,
  ScenarioId,
  SimulationSeed,
  SimulationTick,
} from "@aerion/contracts";
import type { Aircraft, MissionObjective } from "@aerion/domain";
import { computeStateDigest } from "../digest/compute-state-digest.js";
import type { AuthoritativeSimulationState } from "./authoritative-simulation-state.js";

export type InitialSimulationStateInput = {
  readonly missionId: MissionId;
  readonly scenarioId: ScenarioId;
  readonly seed: SimulationSeed;
  readonly aircraft: readonly Aircraft[];
  readonly objectives: readonly MissionObjective[];
};

export const createInitialSimulationState = (
  input: InitialSimulationStateInput,
): AuthoritativeSimulationState => {
  const stateWithoutDigest: Omit<AuthoritativeSimulationState, "stateDigest"> = {
    missionId: input.missionId,
    scenarioId: input.scenarioId,
    seed: input.seed,
    tick: 0 as SimulationTick,
    missionStatus: MissionStatus.Planned,
    missionPhase: MissionPhase.Briefing,
    aircraft: input.aircraft,
    missiles: [],
    radarTracks: [],
    objectives: input.objectives,
    alerts: [],
  };

  return {
    ...stateWithoutDigest,
    stateDigest: computeStateDigest(stateWithoutDigest) as Digest,
  };
};