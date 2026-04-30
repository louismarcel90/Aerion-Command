import type { RenderState } from "../projection/render-state.js";

export const renderAlertStripLines = (state: RenderState): readonly string[] => {
  if (state.alerts.length === 0) {
    return [" ALERTS   none"];
  }

  return [` ALERTS   ${state.alerts.map((alert) => `[${alert}]`).join(" ")}`];
};