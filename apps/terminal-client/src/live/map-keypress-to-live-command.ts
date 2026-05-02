import {
  InputMappingResultType,
  InputMode,
  mapKeyToCommand,
  normalizeTerminalKey,
} from "@aerion/input-system";
import type { MissionCommand } from "@aerion/contracts";
import type { RuntimeContext } from "@aerion/mission-simulator";
import { createLiveCommandId } from "./create-command-id.js";

export type LiveKeypressMappingResult = {
  readonly command: MissionCommand | null;
  readonly exitRequested: boolean;
};

export const mapKeypressToLiveCommand = (
  rawKey: string,
  context: RuntimeContext,
  sequence: number,
): LiveKeypressMappingResult => {
  const playerAircraft = context.state.aircraft.find(
    (aircraft) => `${aircraft.role}`.toUpperCase() === "PLAYER",
  );

  if (playerAircraft === undefined) {
    return {
      command: null,
      exitRequested: false,
    };
  }

  const normalizedKey = normalizeTerminalKey(rawKey);
  const mapping = mapKeyToCommand(normalizedKey, {
    inputMode: InputMode.LiveMission,
    commandId: createLiveCommandId(context.state.tick, sequence),
    issuedAtTick: context.state.tick,
    aircraftId: playerAircraft.aircraftId,
    focusedTrackId: context.state.radarTracks[0]?.trackId ?? null,
  });

  if (mapping.type === InputMappingResultType.ExitRequested) {
    return {
      command: null,
      exitRequested: true,
    };
  }

  if (mapping.type !== InputMappingResultType.MissionCommand) {
    return {
      command: null,
      exitRequested: false,
    };
  }

  return {
    command: mapping.command,
    exitRequested: false,
  };
};