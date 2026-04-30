import type { SimulationEvent, SimulationEventType } from "@aerion/contracts";

export type EventCounter = {
  readonly totalEvents: number;
  readonly byType: Readonly<Record<string, number>>;
};

export const countSimulationEvents = (
  events: readonly SimulationEvent[],
): EventCounter => {
  return events.reduce<EventCounter>(
    (counter, event) => {
      const currentCount = counter.byType[event.type] ?? 0;

      return {
        totalEvents: counter.totalEvents + 1,
        byType: {
          ...counter.byType,
          [event.type]: currentCount + 1,
        },
      };
    },
    {
      totalEvents: 0,
      byType: {},
    },
  );
};

export const getEventTypeCount = (
  counter: EventCounter,
  eventType: SimulationEventType,
): number => {
  return counter.byType[eventType] ?? 0;
};