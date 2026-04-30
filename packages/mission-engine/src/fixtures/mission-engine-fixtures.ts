import { MissionStatus } from "@aerion/contracts";
import {
  createInitialStateFixture,
  transitionMissionStatus,
  replaceMissiles
} from "@aerion/state-store";
import {
  createMissile,
  createMissionObjective,
  MissileStatus,
  MissionObjectiveStatus,
  MissionObjectiveType,
} from "@aerion/domain";
import type { MissileId, TrackId } from "@aerion/contracts";

export const asMissileId = (value: string): MissileId => {
  return value as MissileId;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const createActiveInterceptMissionFixture = () => {
  return transitionMissionStatus(createInitialStateFixture(), MissionStatus.Active);
};

export const createInterceptCompletedMissionFixture = () => {
  const state = createActiveInterceptMissionFixture();
  const aircraft = state.aircraft[0];

if (aircraft === undefined) {
  throw new Error("Expected active intercept mission fixture to include at least one aircraft.");
}

  return replaceMissiles(state, [
  createMissile({
    missileId: asMissileId("missile-1"),
    sourceAircraftId: aircraft.aircraftId,
    targetTrackId: asTrackId("track-enemy-1"),
    status: MissileStatus.ResolvedHit,
    position: aircraft.position,
    ticksSinceLaunch: 4,
  }),
]);
};

export const createSurvivalMissionFixture = () => {
  const state = createActiveInterceptMissionFixture();

  return {
    ...state,
    objectives: [
      createMissionObjective({
        objectiveId: "objective-survive-1",
        type: MissionObjectiveType.Survive,
        label: "Survive the threat window",
        status: MissionObjectiveStatus.Active,
        priority: 1,
      }),
    ],
  };
};