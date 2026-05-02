import readline from "node:readline";
import {
  advanceRuntimeContext,
  runRuntimeStep,
} from "@aerion/mission-simulator";
import { renderLiveScreen } from "./live/render-live-screen.js";
import { createLiveTerminalState } from "./live/create-live-terminal-state.js";
import { mapKeypressToLiveCommand } from "./live/map-keypress-to-live-command.js";
import type { LiveTerminalState } from "./live/live-terminal-state.js";

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

let state: LiveTerminalState = createLiveTerminalState();
let commandSequence = 0;

const renderCurrentTick = (): void => {
  const stepContext = {
    ...state.context,
    commands: state.pendingCommands,
    injectedFaultCodes: [],
  };

  const result = runRuntimeStep(stepContext);
  const accumulatedEvents = [...state.accumulatedEvents, ...result.events];

  const nextContext = advanceRuntimeContext(
    stepContext,
    result,
    [],
    state.context.activeFaultCodes,
    [],
  );

  state = {
    context: nextContext,
    pendingCommands: [],
    accumulatedEvents,
    running: state.running,
  };

  process.stdout.write(renderLiveScreen(result, accumulatedEvents.length));
};

renderCurrentTick();

process.stdin.on("keypress", (chunk: string, key: readline.Key) => {
  if (!state.running) {
    return;
  }

  const keyName = key.name ?? chunk;
  const rawKey = keyName === "escape" ? "escape" : keyName;

  const mapping = mapKeypressToLiveCommand(rawKey, state.context, commandSequence);
  commandSequence += 1;

  if (mapping.exitRequested) {
    state = {
      ...state,
      running: false,
    };

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }

    process.stdout.write("\nExited AERION COMMAND live mode.\n");
    process.exit(0);
  }

  state = {
    ...state,
    pendingCommands:
      mapping.command === null
        ? state.pendingCommands
        : [...state.pendingCommands, mapping.command],
  };

  renderCurrentTick();
});