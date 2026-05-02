import type { Aircraft } from "@aerion/domain";

export const isPlayerAircraft = (aircraft: Aircraft): boolean => {
  const role = aircraft.role?.toUpperCase() ?? "";
  const callsign = aircraft.callsign.toUpperCase();

  return role === "PLAYER" || role === "P1" || callsign === "P1";
};