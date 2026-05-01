import { describe, expect, it } from "vitest";

import {
  createRendererStateFixture,
  defaultTerminalDimensions,
  renderAsciiMissionScreen,
  renderAsciiScreenToString,
} from "@aerion/renderer-ascii";

describe("ascii mission renderer", () => {
  it("renders deterministic mission screen", () => {
    const state = createRendererStateFixture();

    const firstScreen = renderAsciiMissionScreen(state, defaultTerminalDimensions);
    const secondScreen = renderAsciiMissionScreen(state, defaultTerminalDimensions);

    expect(renderAsciiScreenToString(firstScreen)).toBe(
      renderAsciiScreenToString(secondScreen),
    );
  });

  it("renders mission screen content", () => {
    const state = createRendererStateFixture();

    const screen = renderAsciiMissionScreen(state, defaultTerminalDimensions);
    const output = renderAsciiScreenToString(screen);

    expect(output).toContain("AERION");
    expect(output).toContain("TICK");
  });
});