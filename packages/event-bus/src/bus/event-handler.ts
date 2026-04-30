import type { SimulationEvent } from "@aerion/contracts";

export type EventHandler<TEvent extends SimulationEvent = SimulationEvent> = (
  event: TEvent,
) => void;