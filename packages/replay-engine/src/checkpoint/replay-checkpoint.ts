import type { AuthoritativeSnapshot, Digest, SimulationTick } from "@aerion/contracts";

export type ReplayCheckpoint = {
  readonly tick: SimulationTick;
  readonly snapshot: AuthoritativeSnapshot;
  readonly digest: Digest;
};