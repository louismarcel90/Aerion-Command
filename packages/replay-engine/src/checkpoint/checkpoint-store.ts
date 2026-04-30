import type { SimulationTick } from "@aerion/contracts";
import type { ReplayCheckpoint } from "./replay-checkpoint.js";

export type ReplayCheckpointStore = {
  readonly checkpoints: readonly ReplayCheckpoint[];
};

export const createReplayCheckpointStore = (
  checkpoints: readonly ReplayCheckpoint[] = [],
): ReplayCheckpointStore => {
  return {
    checkpoints: [...checkpoints].sort((left, right) => left.tick - right.tick),
  };
};

export const addReplayCheckpoint = (
  store: ReplayCheckpointStore,
  checkpoint: ReplayCheckpoint,
): ReplayCheckpointStore => {
  return createReplayCheckpointStore([...store.checkpoints, checkpoint]);
};

export const findLatestCheckpointAtOrBeforeTick = (
  store: ReplayCheckpointStore,
  tick: SimulationTick,
): ReplayCheckpoint | null => {
  const candidates = store.checkpoints.filter((checkpoint) => checkpoint.tick <= tick);

  return candidates[candidates.length - 1] ?? null;
};