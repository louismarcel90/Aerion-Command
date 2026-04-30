import type { AircraftId, TrackId } from "@aerion/contracts";

export const ThreatBehaviorMode = {
  Patrol: "PATROL",
  Intercept: "INTERCEPT",
  Engage: "ENGAGE",
  Evade: "EVADE",
  Retreat: "RETREAT",
} as const;

export type ThreatBehaviorMode =
  (typeof ThreatBehaviorMode)[keyof typeof ThreatBehaviorMode];

export type ThreatBehaviorState = {
  readonly aircraftId: AircraftId;
  readonly mode: ThreatBehaviorMode;
  readonly selectedTargetTrackId: TrackId | null;
  readonly aggressionScore: number;
  readonly confidenceScore: number;
  readonly ticksInMode: number;
};