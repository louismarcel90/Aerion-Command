import type {
  AircraftId,
  CommandId,
  SimulationTick,
  TrackId,
} from "@aerion/contracts";
import { InputMode } from "../mapping/input-mode.js";
import type { KeyMappingContext } from "../mapping/map-key-to-command.js";

export const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

export const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

export const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const createLiveInputMappingContextFixture = (): KeyMappingContext => {
  return {
    inputMode: InputMode.LiveMission,
    commandId: asCommandId("command-input-1"),
    issuedAtTick: asSimulationTick(12),
    aircraftId: asAircraftId("aircraft-player-1"),
    focusedTrackId: asTrackId("track-enemy-1"),
  };
};

export const createReplayInputMappingContextFixture = (): KeyMappingContext => {
  return {
    inputMode: InputMode.Replay,
    commandId: asCommandId("command-replay-1"),
    issuedAtTick: asSimulationTick(12),
    aircraftId: asAircraftId("aircraft-player-1"),
    focusedTrackId: null,
  };
};