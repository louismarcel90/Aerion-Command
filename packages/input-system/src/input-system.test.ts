import { describe, expect, it } from "vitest";
import { MissionCommandType, MissionStatus, ReasonCode, FaultCode } from "@aerion/contracts";
import {
  appendCommandToBuffer,
  applyCommandPathFaults,
  buildInputTraceEntry,
  createCommandBuffer,
  createLiveInputMappingContextFixture,
  createReplayInputMappingContextFixture,
  drainCommandBuffer,
  InputMappingResultType,
  mapKeyToCommand,
  normalizeTerminalKey,
  ReplayControlCommand,
  TerminalKey,
  validateInputCommand,
} from "./index.js";
import type { CommandId, SimulationTick } from "@aerion/contracts";

const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

describe("terminal key normalization", () => {
  it("normalizes arrow and letter keys", () => {
    expect(normalizeTerminalKey("ArrowUp")).toBe(TerminalKey.ArrowUp);
    expect(normalizeTerminalKey("w")).toBe(TerminalKey.W);
    expect(normalizeTerminalKey("F")).toBe(TerminalKey.F);
  });

  it("returns unsupported for unmapped keys", () => {
    expect(normalizeTerminalKey("x")).toBe(TerminalKey.Unsupported);
  });
});

describe("live mission key mapping", () => {
  it("maps movement key to mission command", () => {
    const context = createLiveInputMappingContextFixture();

    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    expect(result.type).toBe(InputMappingResultType.MissionCommand);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command mapping result.");
    }

    expect(result.command.type).toBe(MissionCommandType.IncreaseSpeed);
    expect(result.command.issuedAtTick).toBe(context.issuedAtTick);
  });

  it("maps fire key with focused target", () => {
    const context = createLiveInputMappingContextFixture();

    const result = mapKeyToCommand(TerminalKey.F, context);

    expect(result.type).toBe(InputMappingResultType.MissionCommand);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command mapping result.");
    }

    if (!("targetTrackId" in result.command)) {
  throw new Error("Expected command to include targetTrackId.");
}

    expect(result.command.type).toBe(MissionCommandType.FireWeapon);
    expect(result.command.targetTrackId).toBe(context.focusedTrackId);
  });

  it("ignores unsupported live mission keys", () => {
    const context = createLiveInputMappingContextFixture();

    const result = mapKeyToCommand(TerminalKey.Unsupported, context);

    expect(result.type).toBe(InputMappingResultType.Ignored);
  });
});

describe("replay key mapping", () => {
  it("maps replay space key to play pause", () => {
    const context = createReplayInputMappingContextFixture();

    const result = mapKeyToCommand(TerminalKey.Space, context);

    expect(result.type).toBe(InputMappingResultType.ReplayControl);

    if (result.type !== InputMappingResultType.ReplayControl) {
      throw new Error("Expected replay control mapping result.");
    }

    expect(result.replayControlCommand).toBe(ReplayControlCommand.PlayPause);
  });

  it("maps replay step forward key", () => {
    const context = createReplayInputMappingContextFixture();

    const result = mapKeyToCommand(TerminalKey.RightBracket, context);

    expect(result.type).toBe(InputMappingResultType.ReplayControl);

    if (result.type !== InputMappingResultType.ReplayControl) {
      throw new Error("Expected replay control mapping result.");
    }

    expect(result.replayControlCommand).toBe(ReplayControlCommand.StepForward);
  });
});

describe("command buffer", () => {
  it("orders commands by tick and command id", () => {
    const context = createLiveInputMappingContextFixture();

    const first = mapKeyToCommand(TerminalKey.ArrowUp, {
      ...context,
      commandId: asCommandId("command-b"),
issuedAtTick: asSimulationTick(2),
    });

    const second = mapKeyToCommand(TerminalKey.ArrowDown, {
      ...context,
      commandId: asCommandId("command-a"),
      issuedAtTick: asSimulationTick(1),
    });

    if (
      first.type !== InputMappingResultType.MissionCommand ||
      second.type !== InputMappingResultType.MissionCommand
    ) {
      throw new Error("Expected mission commands.");
    }

    const buffer = appendCommandToBuffer(
      appendCommandToBuffer(createCommandBuffer(), first.command),
      second.command,
    );

    expect(buffer.commands.map((command) => command.commandId)).toEqual([
      "command-a",
      "command-b",
    ]);
  });

  it("drains command buffer immutably", () => {
    const context = createLiveInputMappingContextFixture();
    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command.");
    }

    const buffer = appendCommandToBuffer(createCommandBuffer(), result.command);
    const drained = drainCommandBuffer(buffer);

    expect(drained.drainedCommands).toHaveLength(1);
    expect(drained.nextBuffer.commands).toHaveLength(0);
    expect(buffer.commands).toHaveLength(1);
  });
});

describe("input command validation", () => {
  it("accepts command during active mission", () => {
    const context = createLiveInputMappingContextFixture();
    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command.");
    }

    const validation = validateInputCommand(result.command, {
      missionStatus: MissionStatus.Active,
      replayModeActive: false,
    });

    expect(validation.accepted).toBe(true);
    expect(validation.reasonCode).toBe(ReasonCode.CommandAccepted);
  });

  it("rejects command during replay mode", () => {
    const context = createLiveInputMappingContextFixture();
    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command.");
    }

    const validation = validateInputCommand(result.command, {
      missionStatus: MissionStatus.Active,
      replayModeActive: true,
    });

    expect(validation.accepted).toBe(false);
    expect(validation.reasonCode).toBe(ReasonCode.CommandRejectedReplayModeReadOnly);
  });

  it("rejects command after terminal mission status", () => {
    const context = createLiveInputMappingContextFixture();
    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command.");
    }

    const validation = validateInputCommand(result.command, {
      missionStatus: MissionStatus.Succeeded,
      replayModeActive: false,
    });

    expect(validation.accepted).toBe(false);
    expect(validation.reasonCode).toBe(ReasonCode.CommandRejectedMissionTerminated);
  });
});

describe("input trace", () => {
  it("builds input trace entries", () => {
    const context = createLiveInputMappingContextFixture();

    const trace = buildInputTraceEntry({
      tick: context.issuedAtTick,
      rawKey: "ArrowUp",
      normalizedKey: TerminalKey.ArrowUp,
      mappingResultType: InputMappingResultType.MissionCommand,
      commandId: context.commandId,
      accepted: true,
      reasonCode: ReasonCode.CommandAccepted,
    });

    expect(trace.tick).toBe(context.issuedAtTick);
    expect(trace.commandId).toBe(context.commandId);
    expect(trace.accepted).toBe(true);
  });
});

describe("command path faults", () => {
  it("drops first command when command dropped fault is active", () => {
    const context = createLiveInputMappingContextFixture();
    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command.");
    }

    const faultResult = applyCommandPathFaults(
      [result.command],
      [FaultCode.CommandDropped],
    );

    expect(faultResult.acceptedCommands).toHaveLength(0);
    expect(faultResult.droppedCommands).toHaveLength(1);
  });

  it("delays commands when command delayed fault is active", () => {
    const context = createLiveInputMappingContextFixture();
    const result = mapKeyToCommand(TerminalKey.ArrowUp, context);

    if (result.type !== InputMappingResultType.MissionCommand) {
      throw new Error("Expected mission command.");
    }

    const faultResult = applyCommandPathFaults(
      [result.command],
      [FaultCode.CommandDelayed],
    );

    expect(faultResult.acceptedCommands).toHaveLength(0);
    expect(faultResult.delayedCommands).toHaveLength(1);
  });
});