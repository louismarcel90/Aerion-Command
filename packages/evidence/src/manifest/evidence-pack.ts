import type {
  MissionEvidenceManifest,
  MissionCommand,
  SimulationEvent,
} from "@aerion/contracts";
import type { MissionDebriefSummary } from "@aerion/decision-rules";

export type MissionEvidencePack = {
  readonly manifest: MissionEvidenceManifest;
  readonly commands: readonly MissionCommand[];
  readonly events: readonly SimulationEvent[];
  readonly debriefSummary: MissionDebriefSummary;
  readonly integritySummary: EvidenceIntegritySummary;
};

export type EvidenceIntegritySummary = {
  readonly scenarioDigestVerified: boolean;
  readonly commandDigestVerified: boolean;
  readonly eventLogDigestVerified: boolean;
  readonly finalStateDigestPresent: boolean;
  readonly replayVerified: boolean;
};

export type EvidencePack = {
  readonly manifest: MissionEvidenceManifest;
  readonly commands: readonly MissionCommand[];
  readonly events: readonly SimulationEvent[];
  readonly debriefSummary: MissionDebriefSummary;
  readonly integritySummary: EvidenceIntegritySummary;
};