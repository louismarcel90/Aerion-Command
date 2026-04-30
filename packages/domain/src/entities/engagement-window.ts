import type { AircraftId, TrackId } from "@aerion/contracts";

export type EngagementWindow = {
  readonly sourceAircraftId: AircraftId;
  readonly targetTrackId: TrackId;
  readonly distanceUnits: number;
  readonly angleOffNoseDegrees: number;
  readonly isInsideLaunchEnvelope: boolean;
  readonly isLockStable: boolean;
};

export const createEngagementWindow = (input: EngagementWindow): EngagementWindow => {
  return {
    ...input,
    distanceUnits: Math.max(0, input.distanceUnits),
    angleOffNoseDegrees: Math.max(0, input.angleOffNoseDegrees),
  };
};