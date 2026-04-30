import type { RenderLayout } from "../layout/render-layout.js";
import type { RenderAircraft, RenderMissile, RenderState, RenderTrack } from "../projection/render-state.js";
import { AsciiSymbol } from "../theme/ascii-symbols.js";

export const renderTacticalMapLines = (
  state: RenderState,
  layout: RenderLayout,
): readonly string[] => {
  const width = Math.max(20, layout.contentWidth - 2);
  const height = layout.mapHeight;
  const grid = createEmptyGrid(width, height);

  state.tracks.forEach((track) => placeTrack(grid, track));
  state.missiles.forEach((missile) => placeMissile(grid, missile));
  state.aircraft.forEach((aircraft) => placeAircraft(grid, aircraft));

  return [
    " AIRSPACE",
    ...grid.map((row) => ` ${row.join("")}`),
  ];
};

const createEmptyGrid = (width: number, height: number): string[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => AsciiSymbol.Empty),
  );
};

const placeAircraft = (grid: string[][], aircraft: RenderAircraft): void => {
  if (aircraft.isDestroyed) {
    return;
  }

  const symbol =
    aircraft.role === "PLAYER"
      ? AsciiSymbol.PlayerAircraft
      : aircraft.role === "ENEMY"
        ? AsciiSymbol.EnemyAircraft
        : aircraft.role === "ESCORT"
          ? AsciiSymbol.EscortAircraft
          : AsciiSymbol.NeutralAircraft;

  placeSymbol(grid, aircraft.x, aircraft.y, symbol);
};

const placeTrack = (grid: string[][], track: RenderTrack): void => {
  placeSymbol(grid, track.x, track.y, AsciiSymbol.Track);
};

const placeMissile = (grid: string[][], missile: RenderMissile): void => {
  placeSymbol(grid, missile.x, missile.y, AsciiSymbol.Missile);
};

const placeSymbol = (grid: string[][], x: number, y: number, symbol: string): void => {
  const row = grid[y];

  if (row === undefined) {
    return;
  }

  if (row[x] === undefined) {
    return;
  }

  row[x] = symbol;
};