import { ReplayVerificationStatus } from "@aerion/contracts";
import type {
  MissionCommand,
  MissionEvidenceManifest,
  SimulationEvent,
} from "@aerion/contracts";
import type { ScenarioDefinition } from "@aerion/scenario-kit";
import { computeCommandSequenceDigest } from "../digest/compute-command-sequence-digest.js";
import { computeEventLogDigest } from "../digest/compute-event-log-digest.js";
import { computeScenarioDigest } from "../digest/compute-scenario-digest.js";
import type { EvidenceIntegritySummary } from "../manifest/evidence-pack.js";

export const verifyEvidenceIntegrity = (
  manifest: MissionEvidenceManifest,
  scenario: ScenarioDefinition,
  commands: readonly MissionCommand[],
  events: readonly SimulationEvent[],
): EvidenceIntegritySummary => {
  return {
    scenarioDigestVerified: computeScenarioDigest(scenario) === manifest.scenarioDigest,
    commandDigestVerified:
      computeCommandSequenceDigest(commands) === manifest.commandSequenceDigest,
    eventLogDigestVerified: computeEventLogDigest(events) === manifest.eventLogDigest,
    finalStateDigestPresent: manifest.finalStateDigest.length > 0,
    replayVerified: manifest.replayVerificationStatus === ReplayVerificationStatus.Verified,
  };
};