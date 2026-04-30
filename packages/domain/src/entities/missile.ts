import type { AircraftId, MissileId, TrackId } from "@aerion/contracts";
import type { TacticalPosition } from "../value-objects/tactical-position.js";

export const MissileStatus = {
  Armed: "ARMED",
  Launched: "LAUNCHED",
  Tracking: "TRACKING",
  ResolvedHit: "RESOLVED_HIT",
  ResolvedMiss: "RESOLVED_MISS",
  Destroyed: "DESTROYED",
} as const;

export type MissileStatus = (typeof MissileStatus)[keyof typeof MissileStatus];

export type Missile = {
  readonly missileId: MissileId;
  readonly sourceAircraftId: AircraftId;
  readonly targetTrackId: TrackId;
  readonly status: MissileStatus;
  readonly position: TacticalPosition;
  readonly ticksSinceLaunch: number;
};

export const createMissile = (input: Missile): Missile => {
  return {
    ...input,
    ticksSinceLaunch: Math.max(0, input.ticksSinceLaunch),
  };
};