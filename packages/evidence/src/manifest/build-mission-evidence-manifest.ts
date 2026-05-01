import type {
  EvidencePackId,
  MissionCommand,
  MissionEvidenceManifest,
  ReasonCode,
  SimulationEvent,
} from "@aerion/contracts";
import { ReplayVerificationStatus } from "@aerion/contracts";
import type { AuthoritativeSnapshot } from "@aerion/contracts";
import type { ScenarioDefinition } from "@aerion/scenario-kit";
import type { ReplayVerificationStamp } from "@aerion/replay-engine";
import { computeCommandSequenceDigest } from "../digest/compute-command-sequence-digest.js";
import { computeEventLogDigest } from "../digest/compute-event-log-digest.js";
import { computeScenarioDigest } from "../digest/compute-scenario-digest.js";

export type BuildMissionEvidenceManifestInput = {
  readonly evidencePackId: EvidencePackId;
  readonly scenario: ScenarioDefinition;
  readonly finalSnapshot: AuthoritativeSnapshot;
  readonly commands: readonly MissionCommand[];
  readonly events: readonly SimulationEvent[];
  readonly replayVerificationStamp: ReplayVerificationStamp | null;
  readonly generatedAtIso: string;
};

export const buildMissionEvidenceManifest = (
  input: BuildMissionEvidenceManifestInput,
): MissionEvidenceManifest => {
  const scenarioDigest = computeScenarioDigest(input.scenario);
  const commandSequenceDigest = computeCommandSequenceDigest(input.commands);
  const eventLogDigest = computeEventLogDigest(input.events);
  const outcomeReasonCodes = collectOutcomeReasonCodes(input.events);

  return {
    evidencePackId: input.evidencePackId,
    evidenceVersion: "1.0.0",
    missionId: input.finalSnapshot.missionId,
    scenarioId: input.scenario.metadata.scenarioId,
    scenarioVersion: input.scenario.metadata.version,
    scenarioDigest,
    seed: input.scenario.metadata.seed,
    commandSequenceDigest,
    eventLogDigest,
    finalStateDigest: input.finalSnapshot.snapshotDigest,
    missionOutcome: {
      status: toManifestOutcomeStatus(input.finalSnapshot.missionStatus),
      reasonCodes: outcomeReasonCodes,
    },
    replayVerificationStatus:
      input.replayVerificationStamp?.status ?? ReplayVerificationStatus.NotReplayed,
    boundedSimplificationReference: "docs/assurance/bounded-simplifications.md",
    generatedAtIso: input.generatedAtIso,
  };
};

const collectOutcomeReasonCodes = (
  events: readonly SimulationEvent[],
): readonly ReasonCode[] => {
  const reasonCodes = events
    .filter((event): event is SimulationEvent & { readonly reasonCode: ReasonCode } => {
      return "reasonCode" in event;
    })
    .map((event) => event.reasonCode);

  return [...new Set(reasonCodes)];
};

const toManifestOutcomeStatus = (
  status: AuthoritativeSnapshot["missionStatus"],
): "SUCCEEDED" | "FAILED" | "ABORTED" => {
  if (status === "SUCCEEDED") {
    return "SUCCEEDED";
  }

  if (status === "ABORTED") {
    return "ABORTED";
  }

  return "FAILED";
};