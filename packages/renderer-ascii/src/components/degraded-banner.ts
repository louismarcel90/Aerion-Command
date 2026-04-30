import type { RenderState } from "../projection/render-state.js";

export const renderDegradedBannerLines = (state: RenderState): readonly string[] => {
  if (state.degradedModePolicy === null) {
    return [" DEGRADED: NONE"];
  }

  if (
    state.degradedModePolicy.unavailableCapabilities.length === 0 &&
    state.degradedModePolicy.degradedCapabilities.length === 0
  ) {
    return [" DEGRADED: NONE"];
  }

  const unavailable = state.degradedModePolicy.unavailableCapabilities.join(",");
  const degraded = state.degradedModePolicy.degradedCapabilities.join(",");

  return [
    ` DEGRADED: ${state.degradedModePolicy.operatorMessage}`,
    ` UNAVAILABLE: ${unavailable.length > 0 ? unavailable : "NONE"}`,
    ` DEGRADED CAPABILITIES: ${degraded.length > 0 ? degraded : "NONE"}`,
  ];
};