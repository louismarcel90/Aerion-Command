import type { RenderState } from "../projection/render-state.js";
import { isHudPartiallyDegraded } from "./hud-degradation.js";

export const renderHudPanelLines = (state: RenderState): readonly string[] => {
  const player = state.aircraft.find((aircraft) => aircraft.role === "PLAYER");

  if (player === undefined) {
    return [" PLAYER   unavailable"];
  }

  if (isHudPartiallyDegraded(state)) {
    return [
      ` PLAYER   SPD: ${formatNumber(player.speedKnots, 3)}   ALT: DEGRADED   HDG: DEGRADED   FUEL: ${Math.round(
        player.fuelPercentage,
      )}%`,
      ` SENSOR   PARTIAL HUD ACTIVE`,
    ];
  }

  const lockLabel = state.tracks.find((track) => track.status === "LOCKED")?.label ?? "NONE";

  return [
    ` PLAYER   SPD: ${formatNumber(player.speedKnots, 3)}   ALT: ${formatNumber(
      player.altitudeFeet,
      5,
    )}   HDG: ${formatNumber(player.headingDegrees, 3)}   LOCK: ${lockLabel}   FUEL: ${Math.round(
      player.fuelPercentage,
    )}%`,
    ` SENSOR   TRACKS: ${state.tracks.length}   MISSILES: ${state.missiles.length}`,
  ];
};

const formatNumber = (value: number, width: number): string => {
  return Math.round(value).toString().padStart(width, "0");
};