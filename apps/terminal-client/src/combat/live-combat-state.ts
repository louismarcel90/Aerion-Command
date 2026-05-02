import { MissionCommandType } from "@aerion/contracts";
import type { MissionCommand } from "@aerion/contracts";

export type LiveCombatState = {
  readonly playerX: number;
  readonly playerY: number;
  readonly enemyX: number;
  readonly enemyY: number;
  readonly enemyDirection: -1 | 1;
  readonly missileActive: boolean;
  readonly missileX: number;
  readonly missileY: number;
  readonly locked: boolean;
  readonly killCount: number;
  readonly respawnCountdownTicks: number;
  readonly lastAction: string;
};

export const createLiveCombatState = (): LiveCombatState => {
  return {
    playerX: 44,
    playerY: 7,
    enemyX: 18,
    enemyY: 4,
    enemyDirection: 1,
    missileActive: false,
    missileX: 0,
    missileY: 0,
    locked: false,
    killCount: 0,
    respawnCountdownTicks: 0,
    lastAction: "MISSION ACTIVE",
  };
};

export const updateLiveCombatState = (
  state: LiveCombatState,
  commands: readonly MissionCommand[],
): LiveCombatState => {
  const latestCommand = commands[commands.length - 1];

  const respawned = updateEnemyRespawn(state);
  const enemy = updateEnemy(respawned);
  const player = updatePlayer(enemy, latestCommand);

  return updateWeapon(player, latestCommand);
};

const isEnemyAlive = (state: LiveCombatState): boolean => {
  return state.respawnCountdownTicks === 0;
};

const updateEnemyRespawn = (state: LiveCombatState): LiveCombatState => {
  if (state.respawnCountdownTicks === 0) {
    return state;
  }

  const nextCountdown = state.respawnCountdownTicks - 1;

  if (nextCountdown > 0) {
    return {
      ...state,
      respawnCountdownTicks: nextCountdown,
      lastAction: `E1 DESTROYED — RESPAWN IN ${nextCountdown}`,
    };
  }

  return {
    ...state,
    enemyX: 18,
    enemyY: 4,
    enemyDirection: 1,
    locked: false,
    respawnCountdownTicks: 0,
    lastAction: "E1 REACQUIRED — HOSTILE TRACK",
  };
};

const updateEnemy = (state: LiveCombatState): LiveCombatState => {
  if (!isEnemyAlive(state)) {
    return state;
  }

  const nextEnemyX = state.enemyX + state.enemyDirection;
  const hitLeftBoundary = nextEnemyX <= 4;
  const hitRightBoundary = nextEnemyX >= 64;

  if (hitLeftBoundary || hitRightBoundary) {
    return {
      ...state,
      enemyDirection: state.enemyDirection === 1 ? -1 : 1,
    };
  }

  return {
    ...state,
    enemyX: nextEnemyX,
  };
};

const updatePlayer = (
  state: LiveCombatState,
  command: MissionCommand | undefined,
): LiveCombatState => {
  if (command === undefined) {
    return state;
  }

  switch (command.type) {
    case MissionCommandType.TurnLeft:
      return {
        ...state,
        playerX: Math.max(2, state.playerX - 2),
        lastAction: "P1 TURN LEFT",
      };

    case MissionCommandType.TurnRight:
      return {
        ...state,
        playerX: Math.min(66, state.playerX + 2),
        lastAction: "P1 TURN RIGHT",
      };

    case MissionCommandType.Climb:
      return {
        ...state,
        playerY: Math.max(1, state.playerY - 1),
        lastAction: "P1 CLIMB",
      };

    case MissionCommandType.Descend:
      return {
        ...state,
        playerY: Math.min(10, state.playerY + 1),
        lastAction: "P1 DESCEND",
      };

    case MissionCommandType.IncreaseSpeed:
      return {
        ...state,
        lastAction: "P1 SPEED UP",
      };

    case MissionCommandType.DecreaseSpeed:
      return {
        ...state,
        lastAction: "P1 SLOW DOWN",
      };

    case MissionCommandType.AttemptLock:
      return {
        ...state,
        locked: isEnemyAlive(state),
        lastAction: isEnemyAlive(state) ? "LOCK ACQUIRED — E1" : "NO TARGET",
      };

    case MissionCommandType.DeployCountermeasure:
      return {
        ...state,
        lastAction: "COUNTERMEASURE DEPLOYED",
      };

    default:
      return state;
  }
};

const updateWeapon = (
  state: LiveCombatState,
  command: MissionCommand | undefined,
): LiveCombatState => {
  if (command?.type === MissionCommandType.FireWeapon) {
    if (!isEnemyAlive(state)) {
      return {
        ...state,
        lastAction: "FOX-2 READY — WAITING FOR E1 RESPAWN",
      };
    }

    return {
      ...state,
      missileActive: true,
      missileX: state.playerX - 2,
      missileY: state.playerY,
      locked: true,
      lastAction: "FOX-2 RELEASED",
    };
  }

  if (!state.missileActive || !isEnemyAlive(state)) {
    return state;
  }

  const nextMissileX =
    state.missileX > state.enemyX ? state.missileX - 3 : state.missileX + 3;

  const nextMissileY =
    state.missileY > state.enemyY
      ? state.missileY - 1
      : state.missileY < state.enemyY
        ? state.missileY + 1
        : state.missileY;

  const hit =
    Math.abs(nextMissileX - state.enemyX) <= 3 &&
    Math.abs(nextMissileY - state.enemyY) <= 1;

  if (hit) {
    return {
      ...state,
      missileActive: false,
      missileX: 0,
      missileY: 0,
      locked: false,
      killCount: state.killCount + 1,
      respawnCountdownTicks: 3,
      lastAction: "SPLASH E1 — TARGET DESTROYED",
    };
  }

  return {
    ...state,
    missileX: nextMissileX,
    missileY: nextMissileY,
  };
};