import { describe, expect, it } from "vitest";
import type { AircraftId, CommandId, MissionCommand, SimulationTick } from "@aerion/contracts";
import { MissionCommandType } from "@aerion/contracts";
import {
  applyFlightManeuver,
  createBoundaryAircraftFixture,
  createFlightReadyAircraftFixture,
  createLowFuelAircraftFixture,
  defaultFlightEnvelopeConstraints,
  FlightManeuverCommand,
  FlightSafetyWarning,
  missionCommandToFlightManeuver,
} from "./index.js";

const asAircraftId = (value: string): AircraftId => {
  return value as AircraftId;
};

const asCommandId = (value: string): CommandId => {
  return value as CommandId;
};

const asSimulationTick = (value: number): SimulationTick => {
  return value as SimulationTick;
};

const createMissionCommand = (type: MissionCommand["type"]): MissionCommand => {
  return {
    commandId: asCommandId("command-flight-1"),
    issuedAtTick: asSimulationTick(1),
    aircraftId: asAircraftId("aircraft-player-1"),
    type,
  };
};

describe("flight maneuver model", () => {
  it("increases speed within configured envelope", () => {
    const aircraft = createFlightReadyAircraftFixture();

    const result = applyFlightManeuver(aircraft, FlightManeuverCommand.IncreaseSpeed);

    expect(result.aircraft.measurements.speedKnots).toBe(
      aircraft.measurements.speedKnots + defaultFlightEnvelopeConstraints.speedStepKnots,
    );
  });

  it("does not exceed max speed", () => {
    const aircraft = createFlightReadyAircraftFixture();

    const result = applyFlightManeuver(
      {
        ...aircraft,
        measurements: {
          ...aircraft.measurements,
          speedKnots: defaultFlightEnvelopeConstraints.maxSpeedKnots,
        },
      },
      FlightManeuverCommand.IncreaseSpeed,
    );

    expect(result.aircraft.measurements.speedKnots).toBe(
      defaultFlightEnvelopeConstraints.maxSpeedKnots,
    );
    expect(result.safetyWarnings).toContain(FlightSafetyWarning.MaximumSpeedReached);
  });

  it("turns left with normalized heading", () => {
    const aircraft = createFlightReadyAircraftFixture();

    const result = applyFlightManeuver(
      {
        ...aircraft,
        measurements: {
          ...aircraft.measurements,
          headingDegrees: 2,
        },
      },
      FlightManeuverCommand.TurnLeft,
    );

    expect(result.aircraft.measurements.headingDegrees).toBe(354);
  });

  it("climbs within altitude envelope", () => {
    const aircraft = createFlightReadyAircraftFixture();

    const result = applyFlightManeuver(aircraft, FlightManeuverCommand.Climb);

    expect(result.aircraft.position.altitudeFeet).toBe(
      aircraft.position.altitudeFeet + defaultFlightEnvelopeConstraints.altitudeStepFeet,
    );
  });

  it("burns fuel on each maneuver", () => {
    const aircraft = createFlightReadyAircraftFixture();

    const result = applyFlightManeuver(aircraft, FlightManeuverCommand.HoldCourse);

    expect(result.aircraft.measurements.fuelPercentage).toBeLessThan(
      aircraft.measurements.fuelPercentage,
    );
  });

  it("raises fuel critical warning", () => {
    const aircraft = createLowFuelAircraftFixture();

    const result = applyFlightManeuver(aircraft, FlightManeuverCommand.HoldCourse);

    expect(result.safetyWarnings).toContain(FlightSafetyWarning.FuelCritical);
  });

  it("raises boundary warning when projected position leaves the tactical grid", () => {
    const aircraft = createBoundaryAircraftFixture();

    const result = applyFlightManeuver(aircraft, FlightManeuverCommand.HoldCourse);

    expect(result.safetyWarnings).toContain(FlightSafetyWarning.TacticalBoundaryReached);
  });
});

describe("mission command mapping", () => {
  it("maps movement mission commands to flight maneuvers", () => {
    const command = createMissionCommand(MissionCommandType.TurnRight);

    expect(missionCommandToFlightManeuver(command)).toBe(FlightManeuverCommand.TurnRight);
  });

  it("ignores non-flight mission commands", () => {
    const command = createMissionCommand(MissionCommandType.FireWeapon);

    expect(missionCommandToFlightManeuver(command)).toBeNull();
  });
});