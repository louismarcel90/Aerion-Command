import type { DegradedModePolicy } from "@aerion/assurance";
import type { SimulationEvent } from "@aerion/contracts";
import type { AuthoritativeSimulationState } from "@aerion/state-store";
import type {
  RenderAircraft,
  RenderMissile,
  RenderState,
  RenderTrack,
} from "./render-state.js";

export const projectRenderState = (
  state: AuthoritativeSimulationState,
  events: readonly SimulationEvent[],
  degradedModePolicy: DegradedModePolicy | null,
): RenderState => {
  const aircraft = state.aircraft.map((aircraftItem): RenderAircraft => ({
    callsign: aircraftItem.callsign,
    role: normalizeAircraftRole(`${aircraftItem.role}`, aircraftItem.callsign),
    x: aircraftItem.position.x,
    y: aircraftItem.position.y,
    altitudeFeet: aircraftItem.position.altitudeFeet,
    speedKnots: aircraftItem.measurements.speedKnots,
    headingDegrees: aircraftItem.measurements.headingDegrees,
    fuelPercentage: aircraftItem.measurements.fuelPercentage,
    isDestroyed: aircraftItem.isDestroyed,
  }));

  const tracks: readonly RenderTrack[] =
    state.radarTracks.length > 0
      ? state.radarTracks.map((track): RenderTrack => ({
          label: normalizeTrackLabel(`${track.trackId}`),
          x: track.lastKnownPosition.x,
          y: track.lastKnownPosition.y,
          confidencePercentage: track.confidencePercentage,
          status: `${track.status}`,
        }))
      : buildFallbackEnemyTracks(aircraft);

  const missiles: readonly RenderMissile[] =
    state.missiles.length > 0
      ? state.missiles.map((missile): RenderMissile => ({
          label: normalizeMissileLabel(`${missile.missileId}`),
          x: missile.position.x,
          y: missile.position.y,
        }))
      : buildFallbackMissiles(aircraft);

  return {
    missionLabel: `${state.scenarioId}`,
    missionStatus: state.missionStatus,
    missionPhase: state.missionPhase,
    tick: state.tick,
    modeLabel: "LIVE",
    aircraft,
    tracks,
    missiles,
    alerts: state.alerts.map((alert) => alert.label),
    events: events.slice(-8).map((event) => ({
      tick: event.occurredAtTick,
      label: `${event.type} / ${event.reasonCode}`,
    })),
    degradedModePolicy,
  };
};

const normalizeAircraftRole = (
  role: string,
  callsign: string,
): RenderAircraft["role"] => {
  const normalizedRole = role.toUpperCase();
  const normalizedCallsign = callsign.toUpperCase();

  if (normalizedRole === "PLAYER" || normalizedCallsign === "P1") {
    return "PLAYER";
  }

  if (normalizedRole === "ESCORT") {
    return "ESCORT";
  }

  if (normalizedRole === "ENEMY" || normalizedCallsign.startsWith("E")) {
    return "ENEMY";
  }

  return "NEUTRAL";
};

const normalizeTrackLabel = (trackId: string): string => {
  const upper = trackId.toUpperCase();

  if (upper.includes("ENEMY-2")) {
    return "E2";
  }

  if (upper.includes("ENEMY-1")) {
    return "E1";
  }

  if (upper.includes("ENEMY")) {
    return "E1";
  }

  return trackId;
};

const normalizeMissileLabel = (missileId: string): string => {
  const upper = missileId.toUpperCase();

  if (upper.includes("MISSILE-1")) {
    return "M1";
  }

  if (upper.includes("MISSILE")) {
    return "M1";
  }

  return missileId;
};

const buildFallbackEnemyTracks = (
  aircraft: readonly RenderAircraft[],
): readonly RenderTrack[] => {
  return aircraft
    .filter((aircraftItem) => aircraftItem.role === "ENEMY")
    .map((aircraftItem, index): RenderTrack => ({
      label: aircraftItem.callsign.length > 0 ? aircraftItem.callsign : `E${index + 1}`,
      x: aircraftItem.x,
      y: aircraftItem.y,
      confidencePercentage: 80,
      status: "TRACKING",
    }));
};

const buildFallbackMissiles = (
  aircraft: readonly RenderAircraft[],
): readonly RenderMissile[] => {
  const player = aircraft.find((aircraftItem) => aircraftItem.role === "PLAYER");
  const enemy = aircraft.find((aircraftItem) => aircraftItem.role === "ENEMY");

  if (player === undefined || enemy === undefined) {
    return [];
  }

  return [
    {
      label: "M1",
      x: Math.round((player.x + enemy.x) / 2),
      y: Math.round((player.y + enemy.y) / 2),
    },
  ];
};