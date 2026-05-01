import { createHash } from "node:crypto";
import type { Digest } from "@aerion/contracts";
import { evidenceStableStringify } from "./evidence-stable-stringify.js";
import type { EvidenceJsonValue } from "./evidence-stable-stringify.js";

export const computeEvidenceDigest = (value: EvidenceJsonValue): Digest => {
  const serialized = evidenceStableStringify(value);
  const digest = createHash("sha256").update(serialized).digest("hex");

  return digest as Digest;
};