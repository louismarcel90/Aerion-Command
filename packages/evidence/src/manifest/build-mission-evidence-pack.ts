import type { MissionCommand, SimulationEvent } from "@aerion/contracts";
import type { MissionDebriefSummary } from "@aerion/decision-rules";

import type { MissionEvidenceManifest } from "@aerion/contracts";
import type { EvidencePack, EvidenceIntegritySummary } from "./evidence-pack.js";

export type BuildMissionEvidencePackInput = {
  readonly manifest: MissionEvidenceManifest;
  readonly commands: readonly MissionCommand[];
  readonly events: readonly SimulationEvent[];
  readonly debriefSummary: MissionDebriefSummary;
  readonly integritySummary: EvidenceIntegritySummary;
};

export const buildMissionEvidencePack = (
  input: BuildMissionEvidencePackInput,
): EvidencePack => {
  return {
    manifest: input.manifest,
    commands: input.commands,
    events: input.events,
    debriefSummary: input.debriefSummary,
    integritySummary: input.integritySummary,
  };
};