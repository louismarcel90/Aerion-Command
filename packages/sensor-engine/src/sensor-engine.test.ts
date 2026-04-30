import { describe, expect, it } from "vitest";
import { FaultCode, ReasonCode } from "@aerion/contracts";
import { createRadarTrack, TrackStatus } from "@aerion/domain";
import {
  applySensorDegradation,
  attemptRadarLock,
  classifyTrackConfidence,
  createEnemyAircraftFixture,
  createPlayerFacingEnemyFixture,
  createStableTrackFixture,
  defaultRadarScanConfiguration,
  evaluateRadarGeometry,
  evaluateRwrAlerts,
  performRadarScan,
  SensorDegradationLevel,
  TrackConfidenceState,
} from "./index.js";

describe("track confidence classification", () => {
  it("classifies confidence levels", () => {
    expect(classifyTrackConfidence(0)).toBe(TrackConfidenceState.None);
    expect(classifyTrackConfidence(20)).toBe(TrackConfidenceState.Low);
    expect(classifyTrackConfidence(50)).toBe(TrackConfidenceState.Medium);
    expect(classifyTrackConfidence(80)).toBe(TrackConfidenceState.High);
    expect(classifyTrackConfidence(95)).toBe(TrackConfidenceState.Stable);
  });
});

describe("radar geometry", () => {
  it("detects a target inside forward sensor arc", () => {
    const player = createPlayerFacingEnemyFixture();
    const enemy = createEnemyAircraftFixture();

    const geometry = evaluateRadarGeometry(player, enemy, 32, 120);

    expect(geometry.insideRange).toBe(true);
    expect(geometry.insideSensorArc).toBe(true);
  });
});

describe("radar scan", () => {
  it("creates a radar track for a visible enemy", () => {
    const player = createPlayerFacingEnemyFixture();
    const enemy = createEnemyAircraftFixture();

    const result = performRadarScan(player, [enemy], []);

    expect(result.tracks).toHaveLength(1);
    expect(result.tracks[0]?.targetAircraftId).toBe(enemy.aircraftId);
  });

  it("decays an existing track when target is not refreshed", () => {
    const player = createPlayerFacingEnemyFixture();
    const existingTrack = createStableTrackFixture();

    const result = performRadarScan(player, [], [existingTrack]);

    expect(result.tracks).toHaveLength(1);
    expect(result.tracks[0]?.confidencePercentage).toBeLessThan(
      existingTrack.confidencePercentage,
    );
  });
});

describe("radar lock", () => {
  it("acquires lock for a high confidence track", () => {
    const player = createPlayerFacingEnemyFixture();
    const track = createStableTrackFixture();

    const result = attemptRadarLock(player, [track], track.trackId);

    expect(result.acquired).toBe(true);
    expect(result.reasonCode).toBe(ReasonCode.LockAcquired);
    expect(result.aircraft.lockedTrackId).toBe(track.trackId);
  });

  it("rejects lock for low confidence track", () => {
    const player = createPlayerFacingEnemyFixture();
    const stableTrack = createStableTrackFixture();
    const lowConfidenceTrack = createRadarTrack({
      ...stableTrack,
      confidencePercentage: 20,
      status: TrackStatus.Detected,
    });

    const result = attemptRadarLock(player, [lowConfidenceTrack], lowConfidenceTrack.trackId);

    expect(result.acquired).toBe(false);
    expect(result.reasonCode).toBe(ReasonCode.LockFailedConfidenceTooLow);
  });

  it("drops lock for stale track", () => {
    const player = createPlayerFacingEnemyFixture();
    const stableTrack = createStableTrackFixture();
    const staleTrack = createRadarTrack({
      ...stableTrack,
      status: TrackStatus.Stale,
      ticksSinceLastRefresh: defaultRadarScanConfiguration.staleAfterTicks,
    });

    const result = attemptRadarLock(player, [staleTrack], staleTrack.trackId);

    expect(result.acquired).toBe(false);
    expect(result.reasonCode).toBe(ReasonCode.LockDroppedSignalDegraded);
  });
});

describe("rwr alerts", () => {
  it("emits spike alert when hostile track locks the aircraft", () => {
    const player = createPlayerFacingEnemyFixture();
    const stableTrack = createStableTrackFixture();
    const hostileLockedTrack = createRadarTrack({
      ...stableTrack,
      sourceAircraftId: stableTrack.targetAircraftId,
      targetAircraftId: player.aircraftId,
      status: TrackStatus.Locked,
    });

    const alerts = evaluateRwrAlerts(player, [hostileLockedTrack]);

    expect(alerts).toHaveLength(1);
    expect(alerts[0]?.label).toBe("RWR SPIKE");
  });
});

describe("sensor degradation", () => {
  it("reduces confidence and drops locked status under degradation", () => {
    const track = createRadarTrack({
      ...createStableTrackFixture(),
      status: TrackStatus.Locked,
      confidencePercentage: 90,
    });

    const degradedTracks = applySensorDegradation([track], {
      level: SensorDegradationLevel.Degraded,
      activeFaultCodes: [FaultCode.RadarDegraded],
    });

    expect(degradedTracks[0]?.status).toBe(TrackStatus.Tracking);
    expect(degradedTracks[0]?.confidencePercentage).toBe(55);
  });

  it("marks tracks as lost during blackout", () => {
    const track = createStableTrackFixture();

    const degradedTracks = applySensorDegradation([track], {
      level: SensorDegradationLevel.Blackout,
      activeFaultCodes: [FaultCode.RadarBlackout],
    });

    expect(degradedTracks[0]?.status).toBe(TrackStatus.Lost);
    expect(degradedTracks[0]?.confidencePercentage).toBe(0);
  });
});