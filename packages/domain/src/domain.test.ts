import { describe, expect, it } from "vitest";
import { MissileStatus, createMissile } from "./entities/missile.js";
import { TrackStatus, createRadarTrack } from "./entities/radar-track.js";
import {
  asAircraftId,
  asMissileId,
  asSimulationTick,
  asTrackId,
  createPlayerAircraftFixture,
} from "./factories/domain-test-builders.js";
import {
  verifyAircraftInventoryInvariant,
  verifyStaleTrackInvariant,
} from "./guards/domain-invariants.js";
import {
  clampPercentage,
  createTacticalMeasurements,
  normalizeHeading,
} from "./value-objects/tactical-measurements.js";
import { createTacticalPosition } from "./value-objects/tactical-position.js";

describe("domain value objects", () => {
  it("normalizes heading values", () => {
    expect(normalizeHeading(370)).toBe(10);
    expect(normalizeHeading(-10)).toBe(350);
  });

  it("clamps percentage values", () => {
    expect(clampPercentage(130)).toBe(100);
    expect(clampPercentage(-20)).toBe(0);
    expect(clampPercentage(71)).toBe(71);
  });

  it("creates safe tactical measurements", () => {
    const measurements = createTacticalMeasurements({
      speedKnots: -12,
      altitudeFeet: -500,
      headingDegrees: 725,
      fuelPercentage: 120,
    });

    expect(measurements.speedKnots).toBe(0);
    expect(measurements.altitudeFeet).toBe(0);
    expect(measurements.headingDegrees).toBe(5);
    expect(measurements.fuelPercentage).toBe(100);
  });
});

describe("domain entities", () => {
  it("creates a player aircraft fixture", () => {
    const aircraft = createPlayerAircraftFixture();

    expect(aircraft.callsign).toBe("P1");
    expect(aircraft.missileInventory).toBe(2);
    expect(aircraft.countermeasureCount).toBe(3);
    expect(aircraft.isDestroyed).toBe(false);
  });

  it("creates a missile with a safe lifetime", () => {
    const missile = createMissile({
      missileId: asMissileId("missile-1"),
      sourceAircraftId: asAircraftId("aircraft-player-1"),
      targetTrackId: asTrackId("track-enemy-1"),
      status: MissileStatus.Launched,
      position: createTacticalPosition({
        x: 10,
        y: 20,
        altitudeFeet: 18000,
      }),
      ticksSinceLaunch: -3,
    });

    expect(missile.ticksSinceLaunch).toBe(0);
  });

  it("creates a radar track with clamped confidence", () => {
    const track = createRadarTrack({
      trackId: asTrackId("track-enemy-1"),
      sourceAircraftId: asAircraftId("aircraft-player-1"),
      targetAircraftId: asAircraftId("aircraft-enemy-1"),
      status: TrackStatus.Tracking,
      confidencePercentage: 140,
      lastKnownPosition: createTacticalPosition({
        x: 20,
        y: 8,
        altitudeFeet: 17000,
      }),
      ticksSinceLastRefresh: -1,
    });

    expect(track.confidencePercentage).toBe(100);
    expect(track.ticksSinceLastRefresh).toBe(0);
  });
});

describe("domain invariants", () => {
  it("verifies aircraft inventory invariant", () => {
    const aircraft = createPlayerAircraftFixture();
    const result = verifyAircraftInventoryInvariant(aircraft);

    expect(result.passed).toBe(true);
    expect(result.invariantName).toBe("AIRCRAFT_INVENTORY_NON_NEGATIVE");
  });

  it("detects stale track confidence violations", () => {
    const track = createRadarTrack({
      trackId: asTrackId("track-stale-1"),
      sourceAircraftId: asAircraftId("aircraft-player-1"),
      targetAircraftId: asAircraftId("aircraft-enemy-1"),
      status: TrackStatus.Stale,
      confidencePercentage: 90,
      lastKnownPosition: createTacticalPosition({
        x: 15,
        y: 6,
        altitudeFeet: 16000,
      }),
      ticksSinceLastRefresh: 10,
    });

    const result = verifyStaleTrackInvariant(track);

    expect(result.passed).toBe(false);
    expect(result.invariantName).toBe("STALE_TRACK_CONFIDENCE_MUST_BE_LIMITED");
  });

  it("keeps branded ticks usable in debrief-oriented data", () => {
    const tick = asSimulationTick(42);

    expect(tick).toBe(42);
  });
});