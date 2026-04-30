import { FaultCode } from "@aerion/contracts";
import {
  createInitialStateFixture,
  replaceMissiles,
} from "@aerion/state-store";
import { createMissile, MissileStatus } from "@aerion/domain";
import { evaluateDegradedModePolicy } from "@aerion/assurance";
import type { MissileId, TrackId } from "@aerion/contracts";
import type { RenderState } from "../projection/render-state.js";
import { projectRenderState } from "../projection/project-render-state.js";

export const asMissileId = (value: string): MissileId => {
  return value as MissileId;
};

export const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

export const createRendererStateFixture = (): RenderState => {
  const state = createInitialStateFixture();
  const aircraft = state.aircraft[0];

  if (aircraft === undefined) {
    throw new Error("Renderer fixture requires one aircraft.");
  }

  const stateWithMissile = replaceMissiles(state, [
    createMissile({
      missileId: asMissileId("missile-1"),
      sourceAircraftId: aircraft.aircraftId,
      targetTrackId: asTrackId("track-enemy-1"),
      status: MissileStatus.Launched,
      position: aircraft.position,
      ticksSinceLaunch: 1,
    }),
  ]);

  return projectRenderState(
    stateWithMissile,
    [],
    evaluateDegradedModePolicy([FaultCode.RadarDegraded]),
  );
};