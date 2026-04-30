import type { RenderState } from "../projection/render-state.js";

export const renderMissionHeaderLines = (state: RenderState): readonly string[] => {
  return [
    ` AERION COMMAND — TACTICAL AIR COMBAT / MISSION OPS`,
    ` MISSION: ${state.missionLabel}`,
    ` STATUS : ${state.missionStatus}`,
    ` PHASE  : ${state.missionPhase}`,
    ` TICK   : ${state.tick.toString().padStart(6, "0")}`,
    ` MODE   : ${state.modeLabel}`,
  ];
};