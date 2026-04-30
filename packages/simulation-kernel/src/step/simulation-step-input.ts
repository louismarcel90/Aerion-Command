import type { MissionCommand, SimulationTick } from "@aerion/contracts";
import type { SeededRandomProvider } from "../random/seeded-random-provider.js";

export type SimulationStepInput = {
  readonly tick: SimulationTick;
  readonly commands: readonly MissionCommand[];
  readonly randomProvider: SeededRandomProvider;
};