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
process.stdin.resume();

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

  const accumulatedEvents = [
    ...state.accumulatedEvents,
    ...result.events,
  ];

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

  console.log(renderLiveScreen(result, accumulatedEvents.length));

  console.log("");
  console.log("LIVE MODE");
  console.log("-----------");
  console.log(`Tick              : ${state.context.state.tick}`);
  console.log(`Events this tick  : ${result.events.length}`);
  console.log(`Events total      : ${accumulatedEvents.length}`);
console.log(`Assurance passed  : ${result.assuranceReport.passed}`);  console.log("");
  console.log("Controls");
  console.log("--------");
  console.log(
    "Arrow keys = speed/turn | W/S = altitude | R = radar | L = lock | F = fire | C = flare | ESC = quit",
  );
};

process.stdin.on("keypress", (character, key) => {
  const rawKey = key?.name ?? character ?? "";

  const mapping = mapKeypressToLiveCommand(
    rawKey,
    state.context,
    commandSequence,
  );

  if (mapping.exitRequested) {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }

    console.clear();
    console.log("Exiting AERION COMMAND...");
    process.exit(0);
  }

  if (mapping.command === null) {
    return;
  }

  commandSequence += 1;

  state = {
    ...state,
    pendingCommands: [...state.pendingCommands, mapping.command],
  };

  renderCurrentTick();
});

renderCurrentTick();