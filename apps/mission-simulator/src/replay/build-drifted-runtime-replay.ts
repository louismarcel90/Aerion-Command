import type { Digest, SimulationTick } from "@aerion/contracts";
import { createRuntimeReplay } from "./create-runtime-replay.js";
import type { RuntimeHistory } from "../history/runtime-history.js";
import type { RuntimeReplayResult } from "./runtime-replay-result.js";

export const buildDriftedRuntimeReplay = (
  history: RuntimeHistory,
  driftDigest: Digest,
  initialReplayTick: SimulationTick,
): RuntimeReplayResult => {
  return createRuntimeReplay(history, driftDigest, initialReplayTick);
};