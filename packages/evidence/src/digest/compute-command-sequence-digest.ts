import type { Digest, MissionCommand } from "@aerion/contracts";
import { computeEvidenceDigest } from "./compute-evidence-digest.js";
import type { EvidenceJsonValue } from "./evidence-stable-stringify.js";

export const computeCommandSequenceDigest = (
  commands: readonly MissionCommand[],
): Digest => {
  const orderedCommands = [...commands].sort((left, right) => {
    if (left.issuedAtTick !== right.issuedAtTick) {
      return left.issuedAtTick - right.issuedAtTick;
    }

    return left.commandId.localeCompare(right.commandId);
  });

  return computeEvidenceDigest(orderedCommands as EvidenceJsonValue);
};