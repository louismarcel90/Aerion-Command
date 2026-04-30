import { describe, expect, it } from "vitest";
import type { TrackId } from "@aerion/contracts";
import { ReasonCode } from "@aerion/contracts";
import { createAircraft, createRadarTrack, MissileStatus } from "@aerion/domain";
import {
  advanceMissileLifecycle,
  applyAuthorizedLaunch,
  authorizeWeaponLaunch,
  createLockedTrackFixture,
  createLowConfidenceTrackFixture,
  createWeaponReadyAircraftFixture,
  defaultWeaponEnvelopeConfiguration,
  deployCountermeasure,
  evaluateLaunchEnvelope,
  isWeaponCooldownActive,
  resolveMissileImpact,
  asMissileId,
  asSimulationTick,
} from "./index.js";

const asTrackId = (value: string): TrackId => {
  return value as TrackId;
};

describe("launch envelope", () => {
  it("evaluates locked target inside launch envelope", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLockedTrackFixture();

    const envelope = evaluateLaunchEnvelope(aircraft, track);

    expect(envelope.isInsideLaunchEnvelope).toBe(true);
    expect(envelope.isLockStable).toBe(true);
  });
});

describe("launch authorization", () => {
  it("authorizes launch with stable lock, inventory and no cooldown", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLockedTrackFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [track],
      track.trackId,
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: null,
      },
      asSimulationTick(10),
    );

    expect(decision.authorized).toBe(true);
    expect(decision.reasonCode).toBe(ReasonCode.LaunchAuthorized);
  });

  it("refuses launch with no stable lock", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLowConfidenceTrackFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [track],
      track.trackId,
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: null,
      },
      asSimulationTick(10),
    );

    expect(decision.authorized).toBe(false);
    expect(decision.reasonCode).toBe(ReasonCode.LaunchRefusedNoStableLock);
  });

  it("refuses launch without inventory", () => {
    const aircraft = createAircraft({
      ...createWeaponReadyAircraftFixture(),
      missileInventory: 0,
    });
    const track = createLockedTrackFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [track],
      track.trackId,
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: null,
      },
      asSimulationTick(10),
    );

    expect(decision.authorized).toBe(false);
    expect(decision.reasonCode).toBe(ReasonCode.LaunchRefusedNoInventory);
  });

  it("refuses launch during cooldown", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLockedTrackFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [track],
      track.trackId,
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: asSimulationTick(9),
      },
      asSimulationTick(10),
    );

    expect(decision.authorized).toBe(false);
    expect(decision.reasonCode).toBe(ReasonCode.LaunchRefusedWeaponCooldownActive);
  });

  it("refuses launch when target track does not exist", () => {
    const aircraft = createWeaponReadyAircraftFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [],
      asTrackId("missing-track"),
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: null,
      },
      asSimulationTick(10),
    );

    expect(decision.authorized).toBe(false);
    expect(decision.reasonCode).toBe(ReasonCode.LaunchRefusedNoStableLock);
  });
});

describe("authorized launch application", () => {
  it("creates a missile and decrements inventory for authorized launch", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLockedTrackFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [track],
      track.trackId,
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: null,
      },
      asSimulationTick(10),
    );

    const result = applyAuthorizedLaunch(
      decision,
      asMissileId("missile-1"),
      asSimulationTick(10),
    );

    expect(result.aircraft.missileInventory).toBe(aircraft.missileInventory - 1);
    expect(result.missile?.status).toBe(MissileStatus.Launched);
    expect(result.cooldownState.lastLaunchTick).toBe(10);
  });
});

describe("weapon cooldown", () => {
  it("detects active cooldown", () => {
    const aircraft = createWeaponReadyAircraftFixture();

    const active = isWeaponCooldownActive(
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: asSimulationTick(10),
      },
      asSimulationTick(12),
    );

    expect(active).toBe(true);
  });

  it("detects expired cooldown", () => {
    const aircraft = createWeaponReadyAircraftFixture();

    const active = isWeaponCooldownActive(
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: asSimulationTick(10),
      },
      asSimulationTick(20),
    );

    expect(active).toBe(false);
  });
});

describe("missile lifecycle", () => {
  it("moves launched missile into tracking after arm delay", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLockedTrackFixture();

    const decision = authorizeWeaponLaunch(
      aircraft,
      [track],
      track.trackId,
      {
        aircraftId: aircraft.aircraftId,
        lastLaunchTick: null,
      },
      asSimulationTick(10),
    );

    const launch = applyAuthorizedLaunch(
      decision,
      asMissileId("missile-1"),
      asSimulationTick(10),
    );

if (launch.missile === null) {
  throw new Error("Expected missile to be created for authorized launch.");
}

const firstAdvance = advanceMissileLifecycle(launch.missile);    const secondAdvance = advanceMissileLifecycle(firstAdvance);

    expect(secondAdvance.status).toBe(MissileStatus.Tracking);
  });
});

describe("countermeasures", () => {
  it("deploys countermeasure and reduces inventory", () => {
    const aircraft = createWeaponReadyAircraftFixture();

    const decision = deployCountermeasure(aircraft);

    expect(decision.deployed).toBe(true);
    expect(decision.aircraft.countermeasureCount).toBe(aircraft.countermeasureCount - 1);
  });

  it("rejects countermeasure deployment when inventory is empty", () => {
    const aircraft = createAircraft({
      ...createWeaponReadyAircraftFixture(),
      countermeasureCount: 0,
    });

    const decision = deployCountermeasure(aircraft);

    expect(decision.deployed).toBe(false);
    expect(decision.effectiveness).toBe(0);
  });
});

describe("missile impact resolution", () => {
  it("resolves missile hit when random sample is under threshold", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createLockedTrackFixture();

    const missile = {
      missileId: asMissileId("missile-1"),
      sourceAircraftId: aircraft.aircraftId,
      targetTrackId: track.trackId,
      status: MissileStatus.Tracking,
      position: aircraft.position,
      ticksSinceLaunch: defaultWeaponEnvelopeConfiguration.missileArmDelayTicks,
    };

    const result = resolveMissileImpact({
      missile,
      targetTrack: track,
      randomSample: 0.1,
      countermeasureEffectiveness: 0,
    });

    expect(result.hit).toBe(true);
    expect(result.reasonCode).toBe(ReasonCode.MissileHitConfirmed);
  });

  it("resolves countermeasure miss when penalty applies", () => {
    const aircraft = createWeaponReadyAircraftFixture();
    const track = createRadarTrack({
      ...createLockedTrackFixture(),
      confidencePercentage: 70,
    });

    const missile = {
      missileId: asMissileId("missile-2"),
      sourceAircraftId: aircraft.aircraftId,
      targetTrackId: track.trackId,
      status: MissileStatus.Tracking,
      position: aircraft.position,
      ticksSinceLaunch: defaultWeaponEnvelopeConfiguration.missileArmDelayTicks,
    };

    const result = resolveMissileImpact({
      missile,
      targetTrack: track,
      randomSample: 0.9,
      countermeasureEffectiveness: 1,
    });

    expect(result.hit).toBe(false);
    expect(result.reasonCode).toBe(ReasonCode.MissileMissedCountermeasureEffective);
  });
});