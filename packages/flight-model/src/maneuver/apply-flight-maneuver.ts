import { ReasonCode } from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";
import { createAircraft, createTacticalMeasurements, createTacticalPosition } from "@aerion/domain";
import type { FlightEnvelopeConstraints } from "../constraints/flight-envelope-constraints.js";
import { defaultFlightEnvelopeConstraints } from "../constraints/flight-envelope-constraints.js";
import { evaluateFlightSafety } from "../envelopes/evaluate-flight-safety.js";
import { applyFuelBurn } from "../fuel/apply-fuel-burn.js";
import { projectPosition } from "../projection/project-position.js";
import type { FlightManeuverCommand } from "./flight-maneuver-command.js";
import type { FlightManeuverResult } from "./flight-maneuver-result.js";

export const applyFlightManeuver = (
  aircraft: Aircraft,
  command: FlightManeuverCommand,
  constraints: FlightEnvelopeConstraints = defaultFlightEnvelopeConstraints,
): FlightManeuverResult => {
  const maneuveredAircraft = applyCommandToAircraft(aircraft, command, constraints);
  const aircraftAfterFuelBurn = applyFuelBurn(maneuveredAircraft, constraints);
  const projected = projectPosition(aircraftAfterFuelBurn, constraints);

  return {
    aircraft: projected.aircraft,
    reasonCodes: [ReasonCode.CommandAccepted],
    safetyWarnings: evaluateFlightSafety(projected.aircraft, constraints, projected.boundaryReached),
  };
};

const applyCommandToAircraft = (
  aircraft: Aircraft,
  command: FlightManeuverCommand,
  constraints: FlightEnvelopeConstraints,
): Aircraft => {
  switch (command) {
    case "INCREASE_SPEED":
      return createAircraft({
        ...aircraft,
        measurements: createTacticalMeasurements({
          ...aircraft.measurements,
          speedKnots: Math.min(
            constraints.maxSpeedKnots,
            aircraft.measurements.speedKnots + constraints.speedStepKnots,
          ),
        }),
      });

    case "DECREASE_SPEED":
      return createAircraft({
        ...aircraft,
        measurements: createTacticalMeasurements({
          ...aircraft.measurements,
          speedKnots: Math.max(
            constraints.minSpeedKnots,
            aircraft.measurements.speedKnots - constraints.speedStepKnots,
          ),
        }),
      });

    case "TURN_LEFT":
      return createAircraft({
        ...aircraft,
        measurements: createTacticalMeasurements({
          ...aircraft.measurements,
          headingDegrees: aircraft.measurements.headingDegrees - constraints.turnStepDegrees,
        }),
      });

    case "TURN_RIGHT":
      return createAircraft({
        ...aircraft,
        measurements: createTacticalMeasurements({
          ...aircraft.measurements,
          headingDegrees: aircraft.measurements.headingDegrees + constraints.turnStepDegrees,
        }),
      });

    case "CLIMB":
      return createAircraft({
        ...aircraft,
        position: createTacticalPosition({
          ...aircraft.position,
          altitudeFeet: Math.min(
            constraints.maxAltitudeFeet,
            aircraft.position.altitudeFeet + constraints.altitudeStepFeet,
          ),
        }),
        measurements: createTacticalMeasurements({
          ...aircraft.measurements,
          altitudeFeet: Math.min(
            constraints.maxAltitudeFeet,
            aircraft.measurements.altitudeFeet + constraints.altitudeStepFeet,
          ),
        }),
      });

    case "DESCEND":
      return createAircraft({
        ...aircraft,
        position: createTacticalPosition({
          ...aircraft.position,
          altitudeFeet: Math.max(
            constraints.minAltitudeFeet,
            aircraft.position.altitudeFeet - constraints.altitudeStepFeet,
          ),
        }),
        measurements: createTacticalMeasurements({
          ...aircraft.measurements,
          altitudeFeet: Math.max(
            constraints.minAltitudeFeet,
            aircraft.measurements.altitudeFeet - constraints.altitudeStepFeet,
          ),
        }),
      });

    case "HOLD_COURSE":
      return aircraft;
  }
};