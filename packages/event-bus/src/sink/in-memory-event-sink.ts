import type { SimulationEvent } from "@aerion/contracts";
import type { EventSink } from "./event-sink.js";
import { sortSimulationEvents } from "../ordering/event-ordering.js";

export const createInMemoryEventSink = (
  initialEvents: readonly SimulationEvent[] = [],
): EventSink => {
  const orderedEvents = sortSimulationEvents(initialEvents);

  return {
    append: (event: SimulationEvent) => {
      return createInMemoryEventSink([...orderedEvents, event]);
    },

    appendMany: (events: readonly SimulationEvent[]) => {
      return createInMemoryEventSink([...orderedEvents, ...events]);
    },

    readAll: () => {
      return orderedEvents;
    },

    clear: () => {
      return createInMemoryEventSink();
    },
  };
};