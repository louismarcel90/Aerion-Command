import type { SimulationEvent, SimulationEventType } from "@aerion/contracts";
import type { EventSink } from "../sink/event-sink.js";
import type { EventHandler } from "./event-handler.js";

export type TypedEventBus = {
  readonly publish: (event: SimulationEvent) => TypedEventBus;
  readonly publishMany: (events: readonly SimulationEvent[]) => TypedEventBus;
  readonly subscribe: (
    eventType: SimulationEventType,
    handler: EventHandler,
  ) => TypedEventBus;
  readonly getSink: () => EventSink;
};

export const createTypedEventBus = (
  sink: EventSink,
  subscriptions: readonly EventSubscription[] = [],
): TypedEventBus => {
  return {
    publish: (event: SimulationEvent) => {
      notifySubscribers(event, subscriptions);
      return createTypedEventBus(sink.append(event), subscriptions);
    },

    publishMany: (events: readonly SimulationEvent[]) => {
      events.forEach((event) => notifySubscribers(event, subscriptions));
      return createTypedEventBus(sink.appendMany(events), subscriptions);
    },

    subscribe: (eventType: SimulationEventType, handler: EventHandler) => {
      return createTypedEventBus(sink, [
        ...subscriptions,
        {
          eventType,
          handler,
        },
      ]);
    },

    getSink: () => {
      return sink;
    },
  };
};

type EventSubscription = {
  readonly eventType: SimulationEventType;
  readonly handler: EventHandler;
};

const notifySubscribers = (
  event: SimulationEvent,
  subscriptions: readonly EventSubscription[],
): void => {
  subscriptions
    .filter((subscription) => subscription.eventType === event.type)
    .forEach((subscription) => subscription.handler(event));
};