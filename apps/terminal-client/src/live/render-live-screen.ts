import { renderAsciiScreenToString } from "@aerion/renderer-ascii";
import type { RuntimeStepResult } from "@aerion/mission-simulator";

export const renderLiveScreen = (
  result: RuntimeStepResult,
  accumulatedEventCount: number,
): string => {
  return [
    "\x1Bc",
    renderAsciiScreenToString(result.screen),
    "",
    "LIVE MODE",
    "---------",
    `Tick              : ${result.state.tick}`,
    `Events this tick  : ${result.events.length}`,
    `Events total      : ${accumulatedEventCount}`,
    `Assurance passed  : ${result.assuranceReport.passed}`,
    "",
    "Controls",
    "--------",
    "Arrow keys = speed/turn | W/S = altitude | R = radar | L = lock | F = fire | C = flare | ESC = quit",
  ].join("\n");
};