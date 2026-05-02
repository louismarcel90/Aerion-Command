import type { RuntimeStepResult } from "@aerion/mission-simulator";
import type { LiveCombatState } from "../combat/live-combat-state.js";

export const renderLiveScreen = (
  result: RuntimeStepResult,
  accumulatedEventCount: number,
  combat: LiveCombatState,
): string => {
  const player = result.state.aircraft.find(
    (aircraft) =>
      `${aircraft.role}`.toUpperCase() === "PLAYER" ||
      aircraft.callsign.toUpperCase() === "P1",
  );

  const playerSpeed = player?.measurements.speedKnots ?? 0;
  const playerAltitude = player?.position.altitudeFeet ?? 0;
  const playerHeading = player?.measurements.headingDegrees ?? 0;
  const playerFuel = player?.measurements.fuelPercentage ?? 0;

  return [
    "\x1b[2J\x1b[3J\x1b[H",
    "┌──────────────────────────────────────────────────────────────┐",
    "│ AERION COMMAND — LIVE TACTICAL COMBAT MODE                   │",
    "├──────────────────────────────────────────────────────────────┤",
    `│ TICK   : ${String(result.state.tick).padStart(6, "0")}     STATUS: ${result.state.missionStatus}`.padEnd(63, " ") + "│",
    `│ ACTION : ${combat.lastAction}`.slice(0, 63).padEnd(63, " ") + "│",
    "├──────────────────────────────────────────────────────────────┤",
    "│ AIRSPACE                                                     │",
    ...renderAirspace(combat),
    "├──────────────────────────────────────────────────────────────┤",
    `│ PLAYER SPD:${String(Math.round(playerSpeed)).padStart(4, "0")} ALT:${String(
      Math.round(playerAltitude),
    ).padStart(5, "0")} HDG:${String(Math.round(playerHeading)).padStart(
      3,
      "0",
    )} FUEL:${Math.round(playerFuel)}%`.padEnd(63, " ") + "│",
    `│ WEAPONS FOX-2 x2  GUN READY  LOCK: ${combat.enemyDestroyed ? "NONE" : "E1"}`.padEnd(63, " ") + "│",
    `│ ALERTS  ${combat.enemyDestroyed ? "[TARGET DESTROYED]" : "[HOSTILE TRACK E1]"}`.padEnd(63, " ") + "│",
    "├──────────────────────────────────────────────────────────────┤",
    "│ CONTROLS ↑/↓ speed | ←/→ turn | W/S altitude | L lock       │",
    "│          F fire | C flare | ESC quit                         │",
    "├──────────────────────────────────────────────────────────────┤",
    `│ EVENTS this tick: ${result.events.length} | total: ${accumulatedEventCount}`.padEnd(63, " ") + "│",
    "└──────────────────────────────────────────────────────────────┘",
  ].join("\n");
};

const renderAirspace = (combat: LiveCombatState): readonly string[] => {
  const width = 60;
  const height = 12;

  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => " "),
  );

  placeText(grid, 42, 8, "^ P1");

  if (!combat.enemyDestroyed) {
    placeText(grid, combat.enemyX, combat.enemyY, "E1 >>>");
  }

  if (combat.missileActive) {
    placeText(grid, combat.missileX, combat.missileY, "M1 ---> *");
  }

  return grid.map((row) => `│ ${row.join("")} │`);
};

const placeText = (
  grid: string[][],
  x: number,
  y: number,
  text: string,
): void => {
  const row = grid[y];

  if (row === undefined) {
    return;
  }

  [...text].forEach((char, index) => {
    const targetX = x + index;

    if (targetX >= 0 && targetX < row.length) {
      row[targetX] = char;
    }
  });
};