import type { DegradedModePolicy } from "@aerion/assurance";
import type { SimulationEvent } from "@aerion/contracts";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type { RenderState } from "./render-state.js";

export const projectRenderState = (
  state: AuthoritativeSimulationState,
  events: readonly SimulationEvent[],
  degradedModePolicy: DegradedModePolicy | null,
): RenderState => {
  return {
    missionLabel: `${state.scenarioId}`,
    missionStatus: state.missionStatus,
    missionPhase: state.missionPhase,
    tick: state.tick,
    modeLabel: "LIVE",
    aircraft: state.aircraft.map((aircraft) => ({
      callsign: aircraft.callsign,
      role: aircraft.role,
      x: aircraft.position.x,
      y: aircraft.position.y,
      altitudeFeet: aircraft.position.altitudeFeet,
      speedKnots: aircraft.measurements.speedKnots,
      headingDegrees: aircraft.measurements.headingDegrees,
      fuelPercentage: aircraft.measurements.fuelPercentage,
      isDestroyed: aircraft.isDestroyed,
    })),
    tracks: state.radarTracks.map((track) => ({
      label: `${track.trackId}`,
      x: track.lastKnownPosition.x,
      y: track.lastKnownPosition.y,
      confidencePercentage: track.confidencePercentage,
      status: track.status,
    })),
    missiles: state.missiles.map((missile) => ({
      label: `${missile.missileId}`,
      x: missile.position.x,
      y: missile.position.y,
    })),
    alerts: state.alerts.map((alert) => alert.label),
    events: events.slice(-8).map((event) => ({
      tick: event.occurredAtTick,
      label: `${event.type} / ${event.reasonCode}`,
    })),
    degradedModePolicy,
  };
};