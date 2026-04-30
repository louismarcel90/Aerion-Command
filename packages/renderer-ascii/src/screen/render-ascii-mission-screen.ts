import { renderAlertStripLines } from "../components/alert-strip.js";
import { renderBox } from "../components/box.js";
import { renderDegradedBannerLines } from "../components/degraded-banner.js";
import { renderEventFeedLines } from "../components/event-feed.js";
import { renderHudPanelLines } from "../components/hud-panel.js";
import { renderMissionHeaderLines } from "../components/mission-header.js";
import { renderTacticalMapLines } from "../components/tactical-map.js";
import { createRenderLayout } from "../layout/render-layout.js";
import type { TerminalDimensions } from "../layout/terminal-dimensions.js";
import type { RenderState } from "../projection/render-state.js";
import { createAsciiScreen } from "./ascii-screen.js";
import type { AsciiScreen } from "./ascii-screen.js";

export const renderAsciiMissionScreen = (
  state: RenderState,
  dimensions: TerminalDimensions,
): AsciiScreen => {
  const layout = createRenderLayout(dimensions);
  const contentLines = [
    ...renderMissionHeaderLines(state),
    ...renderDegradedBannerLines(state),
    ...renderTacticalMapLines(state, layout),
    ...renderHudPanelLines(state),
    ...renderAlertStripLines(state),
    ...renderEventFeedLines(state, layout),
  ];

  return createAsciiScreen(renderBox("AERION COMMAND", layout.dimensions.columns, contentLines));
};