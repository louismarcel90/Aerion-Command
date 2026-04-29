import type {
  Digest,
  EvidencePackId,
  MissionId,
  ScenarioId,
  SimulationSeed,
} from "../shared/branded-types.js";
import type { ReplayVerificationStatus } from "../replay/replay-verification-status.js";
import type { ReasonCode } from "../reasons/reason-code.js";

export type MissionOutcome = {
  readonly status: "SUCCEEDED" | "FAILED" | "ABORTED";
  readonly reasonCodes: readonly ReasonCode[];
};

export type MissionEvidenceManifest = {
  readonly evidencePackId: EvidencePackId;
  readonly evidenceVersion: "1.0.0";
  readonly missionId: MissionId;
  readonly scenarioId: ScenarioId;
  readonly scenarioVersion: string;
  readonly scenarioDigest: Digest;
  readonly seed: SimulationSeed;
  readonly commandSequenceDigest: Digest;
  readonly eventLogDigest: Digest;
  readonly finalStateDigest: Digest;
  readonly missionOutcome: MissionOutcome;
  readonly replayVerificationStatus: ReplayVerificationStatus;
  readonly boundedSimplificationReference: string;
  readonly generatedAtIso: string;
};