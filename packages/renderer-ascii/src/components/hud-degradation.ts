import { DegradedCapability } from "@aerion/assurance";
import type { RenderState } from "../projection/render-state.js";

export const isHudPartiallyDegraded = (state: RenderState): boolean => {
  return (
    state.degradedModePolicy?.degradedCapabilities.includes(
      DegradedCapability.HudFullDisplay,
    ) ?? false
  );
};