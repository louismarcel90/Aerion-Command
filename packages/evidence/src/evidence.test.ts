import { describe, expect, it } from "vitest";

import {
  buildEvidenceExportDocument,
  buildMissionEvidenceManifest,
  buildMissionEvidencePack,
  computeCommandSequenceDigest,
  computeEventLogDigest,
  computeScenarioDigest,
  createEvidenceFixtureInput,
  exportEvidencePackJson,
  verifyEvidenceIntegrity,
} from "./index.js";

const buildEvidencePackFromFixtureInput = () => {
  const input = createEvidenceFixtureInput();

  const manifest = buildMissionEvidenceManifest(input);

  const integritySummary = verifyEvidenceIntegrity(
    manifest,
    input.scenario,
    input.commands,
    input.events,
  );

  const pack = buildMissionEvidencePack({
    manifest,
    commands: input.commands,
    events: input.events,
    debriefSummary: input.debriefSummary,
    integritySummary,
  });

  return {
    input,
    manifest,
    integritySummary,
    pack,
  };
};

describe("evidence digests", () => {
  it("computes stable scenario digest", () => {
    const input = createEvidenceFixtureInput();

    const firstDigest = computeScenarioDigest(input.scenario);
    const secondDigest = computeScenarioDigest(input.scenario);

    expect(firstDigest).toBe(secondDigest);
    expect(firstDigest.length).toBe(64);
  });

  it("computes stable command sequence digest", () => {
    const input = createEvidenceFixtureInput();

    const firstDigest = computeCommandSequenceDigest(input.commands);
    const secondDigest = computeCommandSequenceDigest([...input.commands].reverse());

    expect(firstDigest).toBe(secondDigest);
    expect(firstDigest.length).toBe(64);
  });

  it("computes stable event log digest", () => {
    const input = createEvidenceFixtureInput();

    const firstDigest = computeEventLogDigest(input.events);
    const secondDigest = computeEventLogDigest([...input.events].reverse());

    expect(firstDigest).toBe(secondDigest);
    expect(firstDigest.length).toBe(64);
  });
});

describe("evidence manifest", () => {
  it("builds mission evidence manifest", () => {
    const input = createEvidenceFixtureInput();

    const manifest = buildMissionEvidenceManifest(input);

    expect(manifest.evidencePackId).toBe(input.evidencePackId);
    expect(manifest.scenarioId).toBe(input.scenario.metadata.scenarioId);
    expect(manifest.scenarioDigest.length).toBe(64);
    expect(manifest.commandSequenceDigest.length).toBe(64);
    expect(manifest.eventLogDigest.length).toBe(64);
    expect(manifest.finalStateDigest.length).toBeGreaterThan(0);
  });
});

describe("evidence integrity", () => {
  it("verifies evidence integrity", () => {
    const input = createEvidenceFixtureInput();
    const manifest = buildMissionEvidenceManifest(input);

    const integrity = verifyEvidenceIntegrity(
      manifest,
      input.scenario,
      input.commands,
      input.events,
    );

    expect(integrity.scenarioDigestVerified).toBe(true);
    expect(integrity.commandDigestVerified).toBe(true);
    expect(integrity.eventLogDigestVerified).toBe(true);
    expect(integrity.finalStateDigestPresent).toBe(true);
  });
});

describe("evidence pack", () => {
  it("builds full evidence pack", () => {
    const { input, pack } = buildEvidencePackFromFixtureInput();

    expect(pack.manifest.evidencePackId).toBe(input.evidencePackId);
    expect(pack.commands).toHaveLength(input.commands.length);
    expect(pack.events).toHaveLength(input.events.length);
    expect(pack.integritySummary.scenarioDigestVerified).toBe(true);
    expect(pack.debriefSummary.sections.length).toBeGreaterThan(0);
  });

  it("exports evidence pack JSON", () => {
    const { pack } = buildEvidencePackFromFixtureInput();

    const document = buildEvidenceExportDocument(pack, "2026-04-30T00:00:01.000Z");
    const json = exportEvidencePackJson(pack, "2026-04-30T00:00:01.000Z");

    expect(document.exportedAtIso).toBe("2026-04-30T00:00:01.000Z");
    expect(json).toContain("evidencePackId");
    expect(json).toContain("integritySummary");
  });
});