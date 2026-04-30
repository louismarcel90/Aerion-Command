import { describe, expect, it } from "vitest";
import { FaultCode } from "@aerion/contracts";
import {
  buildAssuranceReport,
  classifyFault,
  createInvalidSucceededMissionFixture,
  createNominalAssuranceStateFixture,
  DegradedCapability,
  evaluateDegradedModePolicy,
  FailureCategory,
  runAssuranceInvariants,
  verifyMissionCompletionInvariant,
  verifyStateConsistency,
} from "./index.js";

describe("assurance invariants", () => {
  it("passes nominal state invariants", () => {
    const state = createNominalAssuranceStateFixture();

    const results = runAssuranceInvariants(state);

    expect(results.every((result) => result.passed)).toBe(true);
  });

  it("detects invalid succeeded mission with incomplete objective", () => {
    const state = createInvalidSucceededMissionFixture();

    const result = verifyMissionCompletionInvariant(state);

    expect(result.passed).toBe(false);
    expect(result.invariantName).toBe(
      "MISSION_COMPLETION_REQUIRES_COMPLETED_OBJECTIVES",
    );
  });
});

describe("degraded mode policy", () => {
  it("marks radar capabilities unavailable during blackout", () => {
    const policy = evaluateDegradedModePolicy([FaultCode.RadarBlackout]);

    expect(policy.unavailableCapabilities).toContain(DegradedCapability.RadarTracking);
    expect(policy.unavailableCapabilities).toContain(DegradedCapability.RadarLock);
  });

  it("marks HUD display degraded during partial HUD fault", () => {
    const policy = evaluateDegradedModePolicy([FaultCode.HudPartial]);

    expect(policy.degradedCapabilities).toContain(DegradedCapability.HudFullDisplay);
  });
});

describe("failure classification", () => {
  it("classifies radar degraded as sensor failure", () => {
    expect(classifyFault(FaultCode.RadarDegraded)).toBe(FailureCategory.SensorFailure);
  });

  it("classifies command dropped as command path failure", () => {
    expect(classifyFault(FaultCode.CommandDropped)).toBe(
      FailureCategory.CommandPathFailure,
    );
  });
});

describe("state consistency", () => {
  it("verifies matching digest", () => {
    const state = createNominalAssuranceStateFixture();

    const report = verifyStateConsistency(state, state.stateDigest);

    expect(report.consistent).toBe(true);
  });
});

describe("assurance report", () => {
  it("builds a passing assurance report for nominal state", () => {
    const state = createNominalAssuranceStateFixture();

    const report = buildAssuranceReport(state, []);

    expect(report.passed).toBe(true);
    expect(report.invariantResults.length).toBeGreaterThan(0);
    expect(report.consistencyReport.consistent).toBe(true);
  });

  it("builds a failing assurance report for invalid state", () => {
    const state = createInvalidSucceededMissionFixture();

    const report = buildAssuranceReport(state, []);

    expect(report.passed).toBe(false);
  });
});