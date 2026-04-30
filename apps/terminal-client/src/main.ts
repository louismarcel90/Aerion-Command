import {
  createRendererStateFixture,
  defaultTerminalDimensions,
  renderAsciiMissionScreen,
  renderAsciiScreenToString,
} from "@aerion/renderer-ascii";
import {
  createLiveInputMappingContextFixture,
  InputMappingResultType,
  mapKeyToCommand,
  normalizeTerminalKey,
} from "@aerion/input-system";

const screen = renderAsciiMissionScreen(
  createRendererStateFixture(),
  defaultTerminalDimensions,
);

console.log(renderAsciiScreenToString(screen));

const normalizedKey = normalizeTerminalKey("ArrowUp");
const mapping = mapKeyToCommand(normalizedKey, createLiveInputMappingContextFixture());

console.log("");
console.log("INPUT TRACE DEMO");
console.log("----------------");

if (mapping.type === InputMappingResultType.MissionCommand) {
  console.log(`Mapped key ArrowUp to command: ${mapping.command.type}`);
} else {
  console.log(`Mapped key ArrowUp to result: ${mapping.type}`);
}