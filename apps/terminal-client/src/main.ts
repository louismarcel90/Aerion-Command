import {
  createRendererStateFixture,
  defaultTerminalDimensions,
  renderAsciiMissionScreen,
  renderAsciiScreenToString,
} from "@aerion/renderer-ascii";

const screen = renderAsciiMissionScreen(
  createRendererStateFixture(),
  defaultTerminalDimensions,
);

console.log(renderAsciiScreenToString(screen));