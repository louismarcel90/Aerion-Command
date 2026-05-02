import { MissionCommandType } from "@aerion/contracts";
import type { MissionCommand } from "@aerion/contracts";

export type LiveCombatState = {
  readonly enemyX: number;
  readonly enemyY: number;
  readonly missileActive: boolean;
  readonly missileX: number;
  readonly missileY: number;
  readonly enemyDestroyed: boolean;
  readonly lastAction: string;
};

export const createLiveCombatState = (): LiveCombatState => {
  return {
    enemyX: 18,
    enemyY: 5,
    missileActive: false,
    missileX: 0,
    missileY: 0,
    enemyDestroyed: false,
    lastAction: "MISSION ACTIVE",
  };
};

export const updateLiveCombatState = (
  state: LiveCombatState,
  commands: readonly MissionCommand[],
): LiveCombatState => {
  const latestCommand = commands[commands.length - 1];

  let nextState: LiveCombatState = {
    ...state,
    enemyX: state.enemyDestroyed ? state.enemyX : Math.max(2, state.enemyX + 1),
  };

  if (latestCommand?.type === MissionCommandType.FireWeapon && !state.enemyDestroyed) {
    nextState = {
      ...nextState,
      missileActive: true,
      missileX: 45,
      missileY: 12,
      lastAction: "FOX-2 RELEASED",
    };
  }

  if (nextState.missileActive && !nextState.enemyDestroyed) {
    const nextMissileX = nextState.missileX - 4;
    const nextMissileY =
      nextState.missileY > nextState.enemyY
        ? nextState.missileY - 1
        : nextState.missileY;

    const hit =
      Math.abs(nextMissileX - nextState.enemyX) <= 3 &&
      Math.abs(nextMissileY - nextState.enemyY) <= 2;

    return {
      ...nextState,
      missileX: nextMissileX,
      missileY: nextMissileY,
      missileActive: !hit,
      enemyDestroyed: hit,
      lastAction: hit ? "SPLASH E1 — TARGET DESTROYED" : nextState.lastAction,
    };
  }

  if (latestCommand?.type === MissionCommandType.DeployCountermeasure) {
    return {
      ...nextState,
      lastAction: "COUNTERMEASURE DEPLOYED",
    };
  }

  if (latestCommand?.type === MissionCommandType.AttemptLock) {
    return {
      ...nextState,
      lastAction: "LOCK ATTEMPT — E1 TRACKING",
    };
  }

  return nextState;
};