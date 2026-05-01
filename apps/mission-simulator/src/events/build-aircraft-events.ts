import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type {
  BaseSimulationEvent,
  MissionId,
  SimulationEvent,
  SimulationTick,
} from "@aerion/contracts";
import type { Aircraft } from "@aerion/domain";

import { buildRuntimeEventId } from "./runtime-event-id.js";

type AircraftStateChangedEvent = BaseSimulationEvent & {
  readonly type: typeof SimulationEventType.AircraftStateChanged;
  readonly reasonCode: ReasonCode;
};

const createAircraftStateChangedEvent = (
  eventId: ReturnType<typeof buildRuntimeEventId>,
  missionId: MissionId,
  tick: SimulationTick,
): AircraftStateChangedEvent => {
  return {
    eventId,
    missionId,
    occurredAtTick: tick,
    type: SimulationEventType.AircraftStateChanged,
    reasonCode: ReasonCode.CommandAccepted,
  };
};

export const buildAircraftStateChangedEvents = (
  missionId: MissionId,
  tick: SimulationTick,
  before: readonly Aircraft[],
  after: readonly Aircraft[],
): readonly SimulationEvent[] => {
  return after
    .filter((afterAircraft) => {
      const beforeAircraft = before.find(
        (aircraft) => aircraft.aircraftId === afterAircraft.aircraftId,
      );

      if (beforeAircraft === undefined) {
        return true;
      }

      return hasAircraftChanged(beforeAircraft, afterAircraft);
    })
    .map((_, index): SimulationEvent => {
      return createAircraftStateChangedEvent(
        buildRuntimeEventId("aircraft-state-changed", tick, index),
        missionId,
        tick,
      ) as SimulationEvent;
    });
};

const hasAircraftChanged = (before: Aircraft, after: Aircraft): boolean => {
  return (
    before.position.x !== after.position.x ||
    before.position.y !== after.position.y ||
    before.position.altitudeFeet !== after.position.altitudeFeet ||
    before.measurements.speedKnots !== after.measurements.speedKnots ||
    before.measurements.headingDegrees !== after.measurements.headingDegrees ||
    before.measurements.fuelPercentage !== after.measurements.fuelPercentage ||
    before.isDestroyed !== after.isDestroyed
  );
}