import type { SimulationEvent } from "@aerion/contracts";
import type { ReplaySession } from "./replay-session.js";

export type ReplayStepResult = {
  readonly session: ReplaySession;
  readonly eventsAtTick: readonly SimulationEvent[];
};