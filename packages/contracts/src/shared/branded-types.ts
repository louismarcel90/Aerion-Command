export type Brand<TValue, TBrand extends string> = TValue & {
  readonly __brand: TBrand;
};

export type MissionId = Brand<string, "MissionId">;
export type ScenarioId = Brand<string, "ScenarioId">;
export type AircraftId = Brand<string, "AircraftId">;
export type MissileId = Brand<string, "MissileId">;
export type TrackId = Brand<string, "TrackId">;
export type EventId = Brand<string, "EventId">;
export type CommandId = Brand<string, "CommandId">;
export type EvidencePackId = Brand<string, "EvidencePackId">;

export type SimulationTick = Brand<number, "SimulationTick">;
export type SimulationSeed = Brand<number, "SimulationSeed">;
export type Digest = Brand<string, "Digest">;