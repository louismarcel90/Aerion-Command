import {
  buildMissionEvidencePack,
  buildMissionEvidenceManifest,
  createEvidenceFixtureInput,
  exportEvidencePackJson,
  verifyEvidenceIntegrity,
} from "@aerion/evidence";

const input = createEvidenceFixtureInput();

// 1. Build manifest
const manifest = buildMissionEvidenceManifest(input);

// 2. Verify integrity
const integritySummary = verifyEvidenceIntegrity(
  manifest,
  input.scenario,
  input.commands,
  input.events,
);

// 3. Build final pack
const pack = buildMissionEvidencePack({
  manifest,
  commands: input.commands,
  events: input.events,
  debriefSummary: input.debriefSummary,
  integritySummary,
});

// 4. Export JSON
const json = exportEvidencePackJson(pack, "2026-04-30T00:00:01.000Z");

console.log(json);