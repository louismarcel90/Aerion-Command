import type {
  EvidencePackId,
  MissionCommand,
  SimulationEvent,
} from "@aerion/contracts";
import type { AuthoritativeSnapshot } from "@aerion/contracts";
import type { MissionDebriefSummary } from "@aerion/decision-rules";
import type { ReplayVerificationStamp } from "@aerion/replay-engine";
import type { ScenarioDefinition } from "@aerion/scenario-kit";
import { verifyEvidenceIntegrity } from "../integrity/verify-evidence-integrity.js";
import { buildMissionEvidenceManifest } from "../manifest/build-mission-evidence-manifest.js"; 
import type { MissionEvidencePack } from "../manifest/evidence-pack.js"; 

export type BuildMissionEvidencePackInput = {
  readonly evidencePackId: EvidencePackId;
  readonly scenario: ScenarioDefinition;
  readonly finalSnapshot: AuthoritativeSnapshot;
  readonly commands: readonly MissionCommand[];
  readonly events: readonly SimulationEvent[];
  readonly debriefSummary: MissionDebriefSummary;
  readonly replayVerificationStamp: ReplayVerificationStamp | null;
  readonly generatedAtIso: string;
};

export const buildMissionEvidencePack = (
  input: BuildMissionEvidencePackInput,
): MissionEvidencePack => {
  const manifest = buildMissionEvidenceManifest({
    evidencePackId: input.evidencePackId,
    scenario: input.scenario,
    finalSnapshot: input.finalSnapshot,
    commands: input.commands,
    events: input.events,
    replayVerificationStamp: input.replayVerificationStamp,
    generatedAtIso: input.generatedAtIso,
  });

  return {
    manifest,
    commands: input.commands,
    events: input.events,
    debriefSummary: input.debriefSummary,
    integritySummary: verifyEvidenceIntegrity(
      manifest,
      input.scenario,
      input.commands,
      input.events,
    ),
  };
};