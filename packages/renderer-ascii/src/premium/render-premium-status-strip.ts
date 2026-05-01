import { MissionStatus } from "@aerion/contracts";
import type { RenderState } from "../projection/render-state.js";
import { TerminalColor, colorize } from "../colors/terminal-color.js";
import type { PremiumRenderOptions } from "./premium-render-options.js";

export const renderPremiumStatusStrip = (
  state: RenderState,
  options: PremiumRenderOptions,
): readonly string[] => {
  const statusColor =
    state.missionStatus === MissionStatus.Active
      ? TerminalColor.Green
      : state.missionStatus === MissionStatus.Failed
        ? TerminalColor.Red
        : TerminalColor.Yellow;

  return [
    colorize(
      ` STATUS ${state.missionStatus} | PHASE ${state.missionPhase} | TICK ${state.tick
        .toString()
        .padStart(6, "0")} | MODE ${state.modeLabel}`,
      statusColor,
      options.colorEnabled,
    ),
  ];
};