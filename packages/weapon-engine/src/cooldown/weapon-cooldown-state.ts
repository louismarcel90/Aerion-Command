import type { AircraftId, SimulationTick } from "@aerion/contracts";

export type WeaponCooldownState = {
  readonly aircraftId: AircraftId;
  readonly lastLaunchTick: SimulationTick | null;
};