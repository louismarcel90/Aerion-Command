import { TerminalColor, colorize } from "../colors/terminal-color.js";
import type { RenderState } from "../projection/render-state.js";
import type { PremiumRenderOptions } from "./premium-render-options.js";

export const renderPremiumAlerts = (
  state: RenderState,
  options: PremiumRenderOptions,
): readonly string[] => {
  if (state.alerts.length === 0) {
    return [
      colorize(" ALERTS   NOMINAL", TerminalColor.Green, options.colorEnabled),
    ];
  }

  return [
    colorize(
      ` ALERTS   ${state.alerts.map((alert) => `[${alert}]`).join(" ")}`,
      TerminalColor.Red,
      options.colorEnabled,
    ),
  ];
};