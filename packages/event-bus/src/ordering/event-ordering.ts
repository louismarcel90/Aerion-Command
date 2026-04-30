import type { SimulationEvent } from "@aerion/contracts";

export const sortSimulationEvents = (
  events: readonly SimulationEvent[],
): readonly SimulationEvent[] => {
  return [...events].sort((left, right) => {
    if (left.occurredAtTick !== right.occurredAtTick) {
      return left.occurredAtTick - right.occurredAtTick;
    }

    return left.eventId.localeCompare(right.eventId);
  });
};