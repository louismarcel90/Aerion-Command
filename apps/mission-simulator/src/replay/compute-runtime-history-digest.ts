import type { Digest } from "@aerion/contracts";
import { computeEventLogDigest } from "@aerion/evidence";
import type { RuntimeHistory } from "../history/runtime-history.js";
import { extractRuntimeEventLog } from "./extract-runtime-event-log.js";

export const computeRuntimeHistoryDigest = (
  history: RuntimeHistory,
): Digest => {
  return computeEventLogDigest(extractRuntimeEventLog(history));
};