import { describe, expect, it } from "vitest";
import {
  compactTerminalDimensions,
  createRenderLayout,
  createRendererStateFixture,
  defaultTerminalDimensions,
  renderAlertStripLines,
  renderAsciiMissionScreen,
  renderAsciiScreenToString,
  renderHudPanelLines,
  renderMissionHeaderLines,
  renderTacticalMapLines,
  RenderLayoutMode,
} from "./index.js";

describe("render layout", () => {
  it("creates full layout for default terminal", () => {
    const layout = createRenderLayout(defaultTerminalDimensions);

    expect(layout.mode).toBe(RenderLayoutMode.Full);
    expect(layout.contentWidth).toBe(96);
  });

  it("creates compact layout for compact terminal", () => {
    const layout = createRenderLayout(compactTerminalDimensions);

    expect(layout.mode).toBe(RenderLayoutMode.Compact);
  });
});

describe("renderer components", () => {
  it("renders mission header lines", () => {
    const state = createRendererStateFixture();

    const lines = renderMissionHeaderLines(state);

    expect(lines.some((line) => line.includes("AERION COMMAND"))).toBe(true);
    expect(lines.some((line) => line.includes("STATUS"))).toBe(true);
  });

  it("renders HUD panel lines", () => {
    const state = createRendererStateFixture();

    const lines = renderHudPanelLines(state);

    expect(lines[0]).toContain("PLAYER");
    expect(lines[0]).toContain("SPD");
    expect(lines[0]).toContain("FUEL");
  });

  it("renders alert strip fallback", () => {
    const state = createRendererStateFixture();

    const lines = renderAlertStripLines(state);

    expect(lines[0]).toContain("ALERTS");
  });

  it("renders tactical map", () => {
    const state = createRendererStateFixture();
    const layout = createRenderLayout(defaultTerminalDimensions);

    const lines = renderTacticalMapLines(state, layout);

    expect(lines[0]).toContain("AIRSPACE");
    expect(lines.length).toBeGreaterThan(2);
  });
});

describe("mission screen", () => {
  it("renders a complete ASCII screen", () => {
    const state = createRendererStateFixture();

    const screen = renderAsciiMissionScreen(state, defaultTerminalDimensions);
    const output = renderAsciiScreenToString(screen);

    expect(output).toContain("AERION COMMAND");
    expect(output).toContain("AIRSPACE");
    expect(output).toContain("PLAYER");
    expect(output).toContain("EVENTS");
  });

  it("renders in compact terminal dimensions", () => {
    const state = createRendererStateFixture();

    const screen = renderAsciiMissionScreen(state, compactTerminalDimensions);
    const output = renderAsciiScreenToString(screen);

    expect(output).toContain("AERION COMMAND");
    expect(screen.lines.length).toBeGreaterThan(0);
  });
});