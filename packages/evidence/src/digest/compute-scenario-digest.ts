import type { Digest } from "@aerion/contracts";
import type { ScenarioDefinition } from "@aerion/scenario-kit";
import { computeEvidenceDigest } from "./compute-evidence-digest.js";
import type { EvidenceJsonValue } from "./evidence-stable-stringify.js";

export const computeScenarioDigest = (scenario: ScenarioDefinition): Digest => {
  return computeEvidenceDigest(scenario as EvidenceJsonValue);
};