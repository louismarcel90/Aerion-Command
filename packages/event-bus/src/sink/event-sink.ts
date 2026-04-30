import type { SimulationEvent } from "@aerion/contracts";

export type EventSink = {
  readonly append: (event: SimulationEvent) => EventSink;
  readonly appendMany: (events: readonly SimulationEvent[]) => EventSink;
  readonly readAll: () => readonly SimulationEvent[];
  readonly clear: () => EventSink;
};