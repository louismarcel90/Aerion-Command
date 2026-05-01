import type { Digest, SimulationEvent } from "@aerion/contracts";
import { computeEvidenceDigest } from "./compute-evidence-digest.js";
import type { EvidenceJsonValue } from "./evidence-stable-stringify.js";

export const computeEventLogDigest = (
  events: readonly SimulationEvent[],
): Digest => {
  const orderedEvents = [...events].sort((left, right) => {
    if (left.occurredAtTick !== right.occurredAtTick) {
      return left.occurredAtTick - right.occurredAtTick;
    }

    return left.eventId.localeCompare(right.eventId);
  });

  return computeEvidenceDigest(orderedEvents as EvidenceJsonValue);
};