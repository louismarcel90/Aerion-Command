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

  const speed = Math.round(player?.measurements.speedKnots ?? 0);
  const altitude = Math.round(player?.position.altitudeFeet ?? 0);
  const heading = Math.round(player?.measurements.headingDegrees ?? 0);
  const fuel = Math.round(player?.measurements.fuelPercentage ?? 0);

  return [
    "\x1b[2J\x1b[3J\x1b[H",
    "┌──────────────────────────────────────────────────────────────────────────────┐",
    "│ AERION COMMAND — PREMIUM TACTICAL HUD                                        │",
    "├──────────────────────────────────────────────────────────────────────────────┤",
    "│ AERION COMMAND — TACTICAL AIR COMBAT / MISSION OPS                           │",
    "│ MISSION: runtime-scenario-001                                                │",
    `│ STATUS : ${result.state.missionStatus}`.padEnd(79, " ") + "│",
    `│ PHASE  : ${result.state.missionPhase}`.padEnd(79, " ") + "│",
    `│ TICK   : ${String(result.state.tick).padStart(6, "0")}`.padEnd(79, " ") + "│",
    "│ MODE   : LIVE                                                                │",
    `│ STATUS ${result.state.missionStatus} | PHASE ${result.state.missionPhase} | TICK ${String(
      result.state.tick,
    ).padStart(6, "0")} | MODE LIVE`.padEnd(79, " ") + "│",
    `│ ACTION ${combat.lastAction}`.slice(0, 79).padEnd(79, " ") + "│",
    `│ SCAN   ${buildScanline(68, result.state.tick)}`.padEnd(79, " ") + "│",
    "│ DEGRADED: NONE                                                               │",
    "│ AIRSPACE                                                                     │",
    ...renderAirspace(combat),
    "├──────────────────────────────────────────────────────────────────────────────┤",
    `│ PLAYER   SPD: ${String(speed).padStart(4, "0")}   ALT: ${String(
      altitude,
    ).padStart(5, "0")}   HDG: ${String(heading).padStart(3, "0")}   LOCK: ${
      combat.respawnCountdownTicks > 0 ? "NONE" : "E1"
    }   FUEL: ${fuel}%`.padEnd(79, " ") + "│",
    "│ WEAPONS  FOX-2 x2   GUN READY    COUNTERMEASURES: 3                          │",
    `│ SENSOR   RADAR: TRACKING   TRACKS: ${combat.respawnCountdownTicks > 0 ? 0 : 1}   MISSILES: ${
      combat.missileActive ? 1 : 0
    }`.padEnd(79, " ") + "│",
    `│ ALERTS   ${
      combat.respawnCountdownTicks > 0 ? "[TARGET DESTROYED]" : "[HOSTILE TRACK E1]"
    }`.padEnd(79, " ") + "│",
    "├──────────────────────────────────────────────────────────────────────────────┤",
    "│ CONTROLS ↑/↓ speed | ←/→ turn | W/S altitude | R radar | L lock | F fire     │",
    "│          C flare | ESC quit                                                  │",
    "├──────────────────────────────────────────────────────────────────────────────┤",
    "│ EVENTS                                                                       │",
    ...renderEvents(result),
    "├──────────────────────────────────────────────────────────────────────────────┤",
    `│ LIVE MODE  Tick: ${result.state.tick} | Events this tick: ${
      result.events.length
    } | Events total: ${accumulatedEventCount}`.padEnd(79, " ") + "│",
    `│ Assurance passed: ${result.assuranceReport.passed}`.padEnd(79, " ") + "│",
    "└──────────────────────────────────────────────────────────────────────────────┘",
  ].join("\n");
};

const renderAirspace = (combat: LiveCombatState): readonly string[] => {
  const width = 76;
  const height = 12;

  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => " "),
  );

  if (combat.respawnCountdownTicks === 0) {
    placeText(grid, combat.enemyX, combat.enemyY, "<<< E1 >>>");
  }

  placeText(grid, combat.playerX, combat.playerY, "^ P1");

  if (combat.missileActive) {
    placeText(grid, combat.missileX, combat.missileY, "* <-M1-> *");
  }

  return grid.map((row) => `│ ${row.join("")} │`);
};

const renderEvents = (result: RuntimeStepResult): readonly string[] => {
  const visibleEvents = result.events.slice(-4);

  if (visibleEvents.length === 0) {
    return ["│ [none]                                                                       │"];
  }

  return visibleEvents.map(
    (event) =>
      `│ [${String(event.occurredAtTick).padStart(4, "0")}] ${event.type} / ${
        event.reasonCode
      }`
        .slice(0, 79)
        .padEnd(79, " ") + "│",
  );
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

const buildScanline = (width: number, tick: number): string => {
  const cursor = tick % width;

  return Array.from({ length: width }, (_, index) =>
    index === cursor ? "◆" : ".",
  ).join("");
};