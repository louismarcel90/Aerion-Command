import { createHash } from "node:crypto";

import type { Digest } from "@aerion/contracts";

export const computeStateDigest = (input: object): Digest => {
  const canonicalPayload = JSON.stringify(input);

  return createHash("sha256")
    .update(canonicalPayload)
    .digest("hex") as Digest;
};