import type { SimulationTick } from "@aerion/contracts";

export type SimulationClock = {
  readonly currentTick: SimulationTick;
};

export const createSimulationClock = (initialTick: SimulationTick): SimulationClock => {
  return {
    currentTick: initialTick,
  };
};

export const advanceSimulationClock = (clock: SimulationClock): SimulationClock => {
  return {
    currentTick: (clock.currentTick + 1) as SimulationTick,
  };
};