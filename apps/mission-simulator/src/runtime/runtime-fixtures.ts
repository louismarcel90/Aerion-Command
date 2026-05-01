import type {
  AircraftId,
  CommandId,
  MissionCommand,
  MissionId,
  SimulationTick,
} from "@aerion/contracts";
import { MissionCommandType } from "@aerion/contracts";
import { showcaseScenario } from "@aerion/scenario-kit";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

export const asMissionId = (value: string): MissionId => {
  return value as MissionId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const createRuntimeCommandFixture = (): MissionCommand => {
  return {
    commandId: asCommandId("command-runtime-001"),
    issuedAtTick: asSimulationTick(0),
    aircraftId: asAircraftId("aircraft-player-1"),
    type: MissionCommandType.IncreaseSpeed,
  };
};

export const createRuntimeScenarioFixture = () => {
  return showcaseScenario;
};