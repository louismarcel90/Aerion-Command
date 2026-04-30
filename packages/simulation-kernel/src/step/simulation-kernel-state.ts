import type { SimulationClock } from "../clock/simulation-clock.js";
import type { SeededRandomProvider } from "../random/seeded-random-provider.js";
import type { SimulationScheduler } from "../scheduler/simulation-scheduler.js";

export type SimulationKernelState = {
  readonly clock: SimulationClock;
  readonly scheduler: SimulationScheduler;
  readonly randomProvider: SeededRandomProvider;
};