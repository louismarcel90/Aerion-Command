import { MissionCommandType } from "@aerion/contracts";
import type { MissionCommand } from "@aerion/contracts";
import type { RuntimeContext } from "@aerion/mission-simulator";
import { isPlayerAircraft } from "@aerion/mission-simulator";

import { createLiveCommandId } from "./create-command-id.js";

export type LiveKeypressMappingResult = {
  readonly command: MissionCommand | null;
  readonly exitRequested: boolean;
};

const normalizeLiveKey = (rawKey: string): string => {
  return rawKey.trim().toLowerCase();
};

const mapLiveKeyToCommandType = (
  key: string,
): MissionCommandType | null => {
  switch (key) {
    case "up":
  return MissionCommandType.Climb;

case "down":
  return MissionCommandType.Descend;

case "left":
  return MissionCommandType.TurnLeft;

case "right":
  return MissionCommandType.TurnRight;

case "w":
  return MissionCommandType.IncreaseSpeed;

case "s":
  return MissionCommandType.DecreaseSpeed;

case "r":
  return MissionCommandType.CycleRadarTarget;

case "l":
  return MissionCommandType.AttemptLock;

case "f":
  return MissionCommandType.FireWeapon;

case "c":
  return MissionCommandType.DeployCountermeasure;

default:
    return null;
  }
};

export const mapKeypressToLiveCommand = (
  rawKey: string,
  context: RuntimeContext,
  sequence: number,
): LiveKeypressMappingResult => {
  const key = normalizeLiveKey(rawKey);

  if (key === "escape" || key === "esc" || key === "q") {
    return {
      command: null,
      exitRequested: true,
    };
  }

  const commandType = mapLiveKeyToCommandType(key);

  if (commandType === null) {
    return {
      command: null,
      exitRequested: false,
    };
  }

  const playerAircraft = context.state.aircraft.find(isPlayerAircraft);

  if (playerAircraft === undefined) {
    return {
      command: null,
      exitRequested: false,
    };
  }

  return {
    command: {
      commandId: createLiveCommandId(context.state.tick, sequence),
      issuedAtTick: context.state.tick,
      aircraftId: playerAircraft.aircraftId,
      type: commandType,
    },
    exitRequested: false,
  };
};