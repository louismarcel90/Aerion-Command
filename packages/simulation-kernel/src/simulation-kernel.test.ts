import { describe, expect, it } from "vitest";
import type {
  AircraftId,
  CommandId,
  MissionCommand,
  SimulationSeed,
  SimulationTick,
} from "@aerion/contracts";
import { MissionCommandType } from "@aerion/contracts";
import {
  createSimulationClock,
  createSeededRandomProvider,
  createSimulationScheduler,
  scheduleCommand,
  advanceSimulationKernel,
  deterministicExecutionOrder,
} from "./index.js";

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

const asSimulationSeed = (value: number): SimulationSeed => {
  return value as SimulationSeed;
};

const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

const createCommand = (
  commandId: CommandId,
  issuedAtTick: SimulationTick,
): MissionCommand => {
  return {
    commandId,
    issuedAtTick,
    aircraftId: asAircraftId("aircraft-player-1"),
    type: MissionCommandType.IncreaseSpeed,
  };
};

describe("seeded random provider", () => {
  it("produces the same sequence for the same seed", () => {
    const firstProvider = createSeededRandomProvider(asSimulationSeed(42));
    const secondProvider = createSeededRandomProvider(asSimulationSeed(42));

    const [firstValueA, firstProviderB] = firstProvider.next();
    const [firstValueB] = firstProviderB.next();

    const [secondValueA, secondProviderB] = secondProvider.next();
    const [secondValueB] = secondProviderB.next();

    expect(firstValueA).toBe(secondValueA);
    expect(firstValueB).toBe(secondValueB);
  });
});

describe("simulation scheduler", () => {
  it("collects commands for the requested tick in deterministic order", () => {
    const scheduler = createSimulationScheduler();
    const tick = asSimulationTick(3);

    const scheduled = scheduleCommand(
      scheduleCommand(
        scheduler,
        createCommand(asCommandId("command-b"), tick),
      ),
      createCommand(asCommandId("command-a"), tick),
    );

    const commands = scheduled.scheduledCommands.map(
      (scheduledCommand) => scheduledCommand.command.commandId,
    );

    expect(commands).toEqual(["command-a", "command-b"]);
  });
});

describe("simulation kernel", () => {
  it("advances the clock and emits deterministic stage order", () => {
    const initialState = {
      clock: createSimulationClock(asSimulationTick(0)),
      scheduler: createSimulationScheduler(),
      randomProvider: createSeededRandomProvider(asSimulationSeed(100)),
    };

    const result = advanceSimulationKernel(initialState);

    expect(result.stepReport.tick).toBe(0);
    expect(result.nextState.clock.currentTick).toBe(1);
    expect(result.stepReport.executedStages).toEqual(deterministicExecutionOrder);
  });

  it("produces identical reports for identical seed and command sequence", () => {
    const tick = asSimulationTick(0);
    const command = createCommand(asCommandId("command-1"), tick);

    const firstState = {
      clock: createSimulationClock(tick),
      scheduler: scheduleCommand(createSimulationScheduler(), command),
      randomProvider: createSeededRandomProvider(asSimulationSeed(777)),
    };

    const secondState = {
      clock: createSimulationClock(tick),
      scheduler: scheduleCommand(createSimulationScheduler(), command),
      randomProvider: createSeededRandomProvider(asSimulationSeed(777)),
    };

    const firstResult = advanceSimulationKernel(firstState);
    const secondResult = advanceSimulationKernel(secondState);

    expect(firstResult.stepReport.tick).toBe(secondResult.stepReport.tick);
    expect(firstResult.stepReport.acceptedCommandIds).toEqual(
      secondResult.stepReport.acceptedCommandIds,
    );
    expect(firstResult.stepReport.randomSample).toBe(
      secondResult.stepReport.randomSample,
    );
    expect(firstResult.stepReport.executedStages).toEqual(
      secondResult.stepReport.executedStages,
    );
  });
});