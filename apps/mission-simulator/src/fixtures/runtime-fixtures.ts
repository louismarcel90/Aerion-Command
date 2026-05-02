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

const asRuntimeScenarioKind = (value: string): RuntimeScenarioKind => {
  return value as RuntimeScenarioKind;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const asScenarioId = (value: string): ScenarioId => {
  return value as ScenarioId;
};

export const asSimulationSeed = (value: number): SimulationSeed => {
  return value as SimulationSeed;
};

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
  };
};

export const createRuntimeCommandSequenceFixture =
  (): readonly MissionCommand[] => {
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

export const createRuntimeFaultScenarioFixture =
  (): FaultInjectionScenario => {
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
    aircraft: [
      {
        aircraftId: asAircraftId("aircraft-player-1"),
        callsign: "P1",
        role: "PLAYER",
        x: 0,
        y: 0,
        altitudeFeet: 12000,
        speedKnots: 420,
        headingDegrees: 90,
        fuelPercentage: 100,
        missileInventory: 4,
        countermeasureCount: 3,
      },
      {
        aircraftId: asAircraftId("aircraft-enemy-1"),
        callsign: "BANDIT-1",
        role: "ENEMY",
        x: 120,
        y: 40,
        altitudeFeet: 11800,
        speedKnots: 390,
        headingDegrees: 270,
        fuelPercentage: 100,
        missileInventory: 2,
        countermeasureCount: 2,
      },
    ],
    objectives: [],
    faults: [],
    scoringWeights: {
      objectiveWeight: 1,
      survivalWeight: 1,
      efficiencyWeight: 1,
    },
  };
};