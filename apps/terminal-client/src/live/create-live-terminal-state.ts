import {
  asMissionId,
  createRuntimeContext,
  createRuntimeScenarioFixture,
} from "@aerion/mission-simulator";

import type { LiveTerminalState } from "./live-terminal-state.js";

export const createLiveTerminalState = (): LiveTerminalState => {
  return {
    context: createRuntimeContext({
      missionId: asMissionId("mission-live-terminal-001"),
      scenario: createRuntimeScenarioFixture(),
    }),
    pendingCommands: [],
    accumulatedEvents: [],
    running: true,
  };
};