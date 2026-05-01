import {
  stepReplaySessionBackward,
  stepReplaySessionForward,
} from "@aerion/replay-engine";
import type { ReplayStepResult } from "@aerion/replay-engine";
import type { RuntimeReplayResult } from "./runtime-replay-result.js";

export const stepRuntimeReplayForward = (
  replay: RuntimeReplayResult,
): ReplayStepResult => {
  return stepReplaySessionForward(replay.replaySession);
};

export const stepRuntimeReplayBackward = (
  replay: RuntimeReplayResult,
): ReplayStepResult => {
  return stepReplaySessionBackward(replay.replaySession);
};