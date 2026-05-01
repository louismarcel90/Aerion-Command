import { renderBox } from "../components/box.js";
import { renderDegradedBannerLines } from "../components/degraded-banner.js";
import { renderEventFeedLines } from "../components/event-feed.js";
import { renderHudPanelLines } from "../components/hud-panel.js";
import { renderMissionHeaderLines } from "../components/mission-header.js";
import { renderTacticalMapLines } from "../components/tactical-map.js";
import { buildScanline } from "../effects/scanline.js";
import { createRenderLayout } from "../layout/render-layout.js";
import type { TerminalDimensions } from "../layout/terminal-dimensions.js";
import type { RenderState } from "../projection/render-state.js";
import { createAsciiScreen } from "../screen/ascii-screen.js";
import type { AsciiScreen } from "../screen/ascii-screen.js";
import { renderPremiumAlerts } from "./render-premium-alerts.js";
import { renderPremiumControls } from "./render-premium-controls.js";
import { renderPremiumStatusStrip } from "./render-premium-status-strip.js";
import { defaultPremiumRenderOptions } from "./premium-render-options.js";
import type { PremiumRenderOptions } from "./premium-render-options.js";

export const renderPremiumMissionScreen = (
  state: RenderState,
  dimensions: TerminalDimensions,
  options: PremiumRenderOptions = defaultPremiumRenderOptions,
): AsciiScreen => {
  const layout = createRenderLayout(dimensions);

  const contentLines = [
    ...renderMissionHeaderLines(state),
    ...renderPremiumStatusStrip(state, options),
    ...(options.showScanline
      ? [` SCAN     ${buildScanline(Math.min(72, layout.contentWidth - 12), state.tick)}`]
      : []),
    ...renderDegradedBannerLines(state),
    ...renderTacticalMapLines(state, layout),
    ...renderHudPanelLines(state),
    ...renderPremiumAlerts(state, options),
    ...(options.showControls ? renderPremiumControls() : []),
    ...renderEventFeedLines(state, layout),
  ];

  return createAsciiScreen(
    renderBox("AERION COMMAND — PREMIUM TACTICAL HUD", layout.dimensions.columns, contentLines),
  );
};