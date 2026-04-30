import type { AircraftId, TrackId } from "@aerion/contracts";
import type { TacticalPosition } from "../value-objects/tactical-position.js";
import { clampPercentage } from "../value-objects/tactical-measurements.js";

export const TrackStatus = {
  Detected: "DETECTED",
  Tracking: "TRACKING",
  Locked: "LOCKED",
  Stale: "STALE",
  Lost: "LOST",
} as const;

export type TrackStatus = (typeof TrackStatus)[keyof typeof TrackStatus];

export type RadarTrack = {
  readonly trackId: TrackId;
  readonly sourceAircraftId: AircraftId;
  readonly targetAircraftId: AircraftId;
  readonly status: TrackStatus;
  readonly confidencePercentage: number;
  readonly lastKnownPosition: TacticalPosition;
  readonly ticksSinceLastRefresh: number;
};

export const createRadarTrack = (input: RadarTrack): RadarTrack => {
  return {
    ...input,
    confidencePercentage: clampPercentage(input.confidencePercentage),
    ticksSinceLastRefresh: Math.max(0, input.ticksSinceLastRefresh),
  };
};