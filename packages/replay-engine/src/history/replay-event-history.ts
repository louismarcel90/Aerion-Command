import type { SimulationEvent } from "@aerion/contracts";
import { sortSimulationEvents } from "@aerion/event-bus";

export type ReplayEventHistory = {
  readonly events: readonly SimulationEvent[];
};

export const createReplayEventHistory = (
  events: readonly SimulationEvent[],
): ReplayEventHistory => {
  return {
    events: sortSimulationEvents(events),
  };
};

export const eventsAtReplayTick = (
  history: ReplayEventHistory,
  tick: number,
): readonly SimulationEvent[] => {
  return history.events.filter((event) => event.occurredAtTick === tick);
};