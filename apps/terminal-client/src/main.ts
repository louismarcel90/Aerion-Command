import readline from "node:readline";
import {
  advanceRuntimeContext,
  runRuntimeStep,
} from "@aerion/mission-simulator";
import {
  createLiveCombatState,
  updateLiveCombatState,
} from "./combat/live-combat-state.js";
import { createLiveTerminalState } from "./live/create-live-terminal-state.js";
import type { LiveTerminalState } from "./live/live-terminal-state.js";
import { mapKeypressToLiveCommand } from "./live/map-keypress-to-live-command.js";
import { renderLiveScreen } from "./live/render-live-screen.js";

readline.emitKeypressEvents(process.stdin);
process.stdin.resume();

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

let state: LiveTerminalState = createLiveTerminalState();
let combatState = createLiveCombatState();
let commandSequence = 0;

const exitLiveMode = (): void => {
  state = {
    ...state,
    running: false,
  };

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }

  console.clear();
  console.log("Exiting AERION COMMAND...");
  process.exit(0);
};

const renderCurrentTick = (): void => {
  const stepContext = {
    ...state.context,
    commands: state.pendingCommands,
    injectedFaultCodes: [],
  };

  const result = runRuntimeStep(stepContext);

  const accumulatedEvents = [
    ...state.accumulatedEvents,
    ...result.events,
  ];

  combatState = updateLiveCombatState(
    combatState,
    state.pendingCommands,
  );

  const nextContext = advanceRuntimeContext(
    stepContext,
    result,
    [],
    state.context.activeFaultCodes,
    [],
  );

  state = {
    ...state,
    context: nextContext,
    accumulatedEvents,
    pendingCommands: [],
  };

  console.clear();
  console.log(
    renderLiveScreen(
      result,
      accumulatedEvents.length,
      combatState,
    ),
  );
};

process.stdin.on("keypress", (character: string | undefined, key: readline.Key) => {
  if (!state.running) {
    return;
  }

  const keyName = key.name ?? character ?? "";
  const rawKey =
    keyName === "escape" || keyName === "esc" || character === "\u001b"
      ? "escape"
      : keyName;

  if (rawKey === "escape" || rawKey.toLowerCase() === "q") {
    exitLiveMode();
  }

  const mapping = mapKeypressToLiveCommand(
    rawKey,
    state.context,
    commandSequence,
  );

  commandSequence += 1;

  if (mapping.exitRequested) {
    exitLiveMode();
  }

  if (mapping.command !== null) {
    state = {
      ...state,
      pendingCommands: [
        ...state.pendingCommands,
        mapping.command,
      ],
    };
  }

  renderCurrentTick();
});

renderCurrentTick();