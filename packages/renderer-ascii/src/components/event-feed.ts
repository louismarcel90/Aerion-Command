import type { RenderLayout } from "../layout/render-layout.js";
import type { RenderState } from "../projection/render-state.js";

export const renderEventFeedLines = (
  state: RenderState,
  layout: RenderLayout,
): readonly string[] => {
  const visibleEvents = state.events.slice(-layout.eventFeedHeight);

  if (visibleEvents.length === 0) {
    return [" EVENTS", " [none]"];
  }

  return [
    " EVENTS",
    ...visibleEvents.map((event) => ` [${event.tick.toString().padStart(4, "0")}] ${event.label}`),
  ];
};