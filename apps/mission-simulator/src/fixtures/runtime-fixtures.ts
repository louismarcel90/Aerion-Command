import {
  FaultCode,
  MissionCommandType,
  type AircraftId,
  type CommandId,
  type MissionCommand,
  type MissionId,
  type ScenarioId,
  type SimulationSeed,
  type SimulationTick,
} from "@aerion/contracts";

import type { FaultInjectionScenario } from "@aerion/assurance";
import type { ScenarioDefinition } from "@aerion/scenario-kit";

type RuntimeScenarioKind = ScenarioDefinition["metadata"]["kind"];
const asRuntimeScenarioKind = (value: string): RuntimeScenarioKind =>
  value as RuntimeScenarioKind;

export const asMissionId = (value: string): MissionId => value as MissionId;
export const asCommandId = (value: string): CommandId => value as CommandId;
export const asAircraftId = (value: string): AircraftId => value as AircraftId;
export const asSimulationTick = (value: number): SimulationTick => value as SimulationTick;
export const asScenarioId = (value: string): ScenarioId => value as ScenarioId;
export const asSimulationSeed = (value: number): SimulationSeed => value as SimulationSeed;

export const createRuntimeCommandAtTickFixture = (
  commandId: CommandId,
  tick: SimulationTick,
  type: MissionCommandType,
): MissionCommand => {
  return {
    commandId,
    issuedAtTick: tick,
    aircraftId: asAircraftId("aircraft-player-1"),
    type,
  } as MissionCommand;
};

export const createRuntimeCommandSequenceFixture = (): readonly MissionCommand[] => {
  return [
    createRuntimeCommandAtTickFixture(
      asCommandId("command-runtime-001"),
      asSimulationTick(0),
      MissionCommandType.IncreaseSpeed,
    ),
    createRuntimeCommandAtTickFixture(
      asCommandId("command-runtime-002"),
      asSimulationTick(1),
      MissionCommandType.TurnRight,
    ),
    createRuntimeCommandAtTickFixture(
      asCommandId("command-runtime-003"),
      asSimulationTick(2),
      MissionCommandType.Climb,
    ),
  ];
};

export const createRuntimeFaultScenarioFixture = (): FaultInjectionScenario => {
  return {
    scenarioId: "runtime-fault-demo",
    label: "Runtime radar degradation demo",
    scheduledFaults: [
      {
        faultCode: FaultCode.RadarDegraded,
        injectAtTick: asSimulationTick(1),
        durationTicks: 2,
      },
    ],
  };
};

export const createRuntimeScenarioFixture = (): ScenarioDefinition => {
  return {
    metadata: {
      kind: asRuntimeScenarioKind("TACTICAL_INTERCEPT"),
      scenarioId: asScenarioId("runtime-scenario-001"),
      title: "Runtime Mission Simulator Demo",
      briefing: "Deterministic runtime loop demo scenario.",
      version: "1.0.0",
      seed: asSimulationSeed(1),
      recommendedDurationTicks: 4,
    },
    aircraft: [],
    objectives: [],
    faults: [],
    scoringWeights: {
      objectiveWeight: 1,
      survivalWeight: 1,
      efficiencyWeight: 1,
    },
  };
};