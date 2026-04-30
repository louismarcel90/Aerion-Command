import type { TerminalDimensions } from "./terminal-dimensions.js";
import { normalizeTerminalDimensions } from "./terminal-dimensions.js";

export const RenderLayoutMode = {
  Full: "FULL",
  Compact: "COMPACT",
} as const;

export type RenderLayoutMode = (typeof RenderLayoutMode)[keyof typeof RenderLayoutMode];

export type RenderLayout = {
  readonly dimensions: TerminalDimensions;
  readonly mode: RenderLayoutMode;
  readonly contentWidth: number;
  readonly mapHeight: number;
  readonly eventFeedHeight: number;
};

export const createRenderLayout = (dimensions: TerminalDimensions): RenderLayout => {
  const normalized = normalizeTerminalDimensions(dimensions);
  const mode =
    normalized.columns >= 96 && normalized.rows >= 30
      ? RenderLayoutMode.Full
      : RenderLayoutMode.Compact;

  return {
    dimensions: normalized,
    mode,
    contentWidth: normalized.columns - 4,
    mapHeight: mode === RenderLayoutMode.Full ? 12 : 8,
    eventFeedHeight: mode === RenderLayoutMode.Full ? 6 : 4,
  };
};