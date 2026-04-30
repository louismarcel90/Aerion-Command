import type { Aircraft, Missile, RadarTrack } from "@aerion/domain";
import { createMissile, MissileStatus } from "@aerion/domain";
import type { MissileId } from "@aerion/contracts";

export const createLaunchedMissile = (
  missileId: MissileId,
  sourceAircraft: Aircraft,
  targetTrack: RadarTrack,
): Missile => {
  return createMissile({
    missileId,
    sourceAircraftId: sourceAircraft.aircraftId,
    targetTrackId: targetTrack.trackId,
    status: MissileStatus.Launched,
    position: sourceAircraft.position,
    ticksSinceLaunch: 0,
  });
};