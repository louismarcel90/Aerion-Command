import { describe, expect, it } from "vitest";
import { ReasonCode } from "@aerion/contracts";
import { createRadarTrack, TrackStatus } from "@aerion/domain";
import { FlightManeuverCommand } from "@aerion/flight-model";
import type { TrackId } from "@aerion/contracts";
import {
  createInitialThreatBehaviorStateFixture,
  createLowFuelThreatAircraftFixture,
  createOpponentTrackFixture,
  createThreatAircraftFixture,
  evaluateThreatDecision,
  selectHighestConfidenceTarget,
  ThreatBehaviorMode,
  updateThreatBehavior,
} from "./src/index";

const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};
describe("threat target selection", () => {
  it("selects the highest confidence eligible track", () => {
    const lowerTrack = createRadarTrack({
      ...createOpponentTrackFixture(),
trackId: asTrackId("track-low"),      confidencePercentage: 55,
    });

    const higherTrack = createRadarTrack({
      ...createOpponentTrackFixture(),
      trackId: asTrackId("track-high"),
      confidencePercentage: 90,
    });

    const selection = selectHighestConfidenceTarget([lowerTrack, higherTrack]);

    expect(selection.selectedTrack?.trackId).toBe(higherTrack.trackId);
  });

  it("ignores stale tracks", () => {
    const staleTrack = createRadarTrack({
      ...createOpponentTrackFixture(),
      status: TrackStatus.Stale,
      confidencePercentage: 95,
    });

    const selection = selectHighestConfidenceTarget([staleTrack]);

    expect(selection.selectedTrack).toBeNull();
  });
});

describe("threat behavior update", () => {
  it("moves from patrol to intercept when target is visible", () => {
    const behavior = createInitialThreatBehaviorStateFixture();
    const track = createOpponentTrackFixture();

    const result = updateThreatBehavior(behavior, track, false, 74);

    expect(result.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Intercept);
    expect(result.nextBehaviorState.selectedTargetTrackId).toBe(track.trackId);
    expect(result.reasonCode).toBe(ReasonCode.ThreatMaintainedIntercept);
  });

  it("moves to engage when aggression threshold is reached", () => {
    const behavior = {
      ...createInitialThreatBehaviorStateFixture(),
      aggressionScore: 65,
    };
    const track = createOpponentTrackFixture();

    const result = updateThreatBehavior(behavior, track, false, 74);

    expect(result.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Engage);
    expect(result.reasonCode).toBe(ReasonCode.ThreatSelectedTarget);
  });

  it("moves to evade when locked by opponent", () => {
    const behavior = createInitialThreatBehaviorStateFixture();
    const track = createOpponentTrackFixture();

    const result = updateThreatBehavior(behavior, track, true, 74);

    expect(result.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Evade);
    expect(result.reasonCode).toBe(ReasonCode.ThreatStartedEvasiveManeuver);
  });

  it("moves to retreat on low fuel", () => {
    const behavior = createInitialThreatBehaviorStateFixture();
    const track = createOpponentTrackFixture();

    const result = updateThreatBehavior(behavior, track, false, 8);

    expect(result.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Retreat);
    expect(result.reasonCode).toBe(ReasonCode.ThreatRetreatedLowFuel);
  });

  it("returns to patrol when no target is visible", () => {
    const behavior = createInitialThreatBehaviorStateFixture();

    const result = updateThreatBehavior(behavior, null, false, 74);

    expect(result.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Patrol);
    expect(result.reasonCode).toBe(ReasonCode.ThreatHeldCourseNoTarget);
  });
});

describe("threat decision evaluation", () => {
  it("evaluates a deterministic intercept decision", () => {
    const threatAircraft = createThreatAircraftFixture();
    const behavior = createInitialThreatBehaviorStateFixture();
    const track = createOpponentTrackFixture();

    const decision = evaluateThreatDecision({
      threatAircraft,
      visibleTracks: [track],
      isThreatLockedByOpponent: false,
      behaviorState: behavior,
    });

    expect(decision.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Intercept);
    expect(decision.maneuverCommand).toBe(FlightManeuverCommand.TurnLeft);
    expect(decision.reasonCode).toBe(ReasonCode.ThreatMaintainedIntercept);
  });

  it("evaluates a retreat decision on low fuel", () => {
    const threatAircraft = createLowFuelThreatAircraftFixture();
    const behavior = createInitialThreatBehaviorStateFixture();
    const track = createOpponentTrackFixture();

    const decision = evaluateThreatDecision({
      threatAircraft,
      visibleTracks: [track],
      isThreatLockedByOpponent: false,
      behaviorState: behavior,
    });

    expect(decision.nextBehaviorState.mode).toBe(ThreatBehaviorMode.Retreat);
    expect(decision.maneuverCommand).toBe(FlightManeuverCommand.TurnRight);
    expect(decision.reasonCode).toBe(ReasonCode.ThreatRetreatedLowFuel);
  });
});