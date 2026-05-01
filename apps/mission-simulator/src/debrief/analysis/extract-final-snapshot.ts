import { buildAuthoritativeSnapshot } from "@aerion/state-store";
import type { AuthoritativeSnapshot } from "@aerion/contracts";

import type { RuntimeHistory } from "../../history/runtime-history.js";

export const extractFinalSnapshot = (
  history: RuntimeHistory,
): AuthoritativeSnapshot => {
  const lastEntry = history.entries[history.entries.length - 1];

  if (lastEntry === undefined) {
    throw new Error("No runtime history entries found.");
  }

  return buildAuthoritativeSnapshot(lastEntry.state);
};