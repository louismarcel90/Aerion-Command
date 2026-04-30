import { describe, expect, it } from "vitest";
import { ReasonCode } from "@aerion/contracts";
import {
  buildMissionDebriefSummary,
  buildOutcomeReasonChain,
  createDebriefEventsFixture,
  createDebriefScoreFixture,
  createDebriefSnapshotFixture,
  createDebriefTimelineFixture,
  detectMissedOpportunities,
  explainReasonCode,
  renderDebriefSummaryText,
} from "./index.js";

describe("reason explanations", () => {
  it("explains launch refusal outside envelope", () => {
    const explanation = explainReasonCode(ReasonCode.LaunchRefusedOutsideEnvelope);

    expect(explanation.title).toContain("outside envelope");
    expect(explanation.operatorGuidance.length).toBeGreaterThan(0);
  });

  it("explains replay drift", () => {
    const explanation = explainReasonCode(ReasonCode.ReplayDriftDetected);

    expect(explanation.title).toContain("Replay drift");
    expect(explanation.explanation).toContain("different digest");
  });
});

describe("outcome reason chain", () => {
  it("builds reason chain entries with explanations", () => {
    const snapshot = createDebriefSnapshotFixture();

    const chain = buildOutcomeReasonChain(snapshot.missionId, "Test chain", [
      {
        tick: snapshot.tick,
        reasonCode: ReasonCode.MissionSucceededObjectiveComplete,
      },
    ]);

    expect(chain.entries).toHaveLength(1);
    expect(chain.entries[0]?.reasonCode).toBe(
      ReasonCode.MissionSucceededObjectiveComplete,
    );
  });
});

describe("missed opportunities", () => {
  it("detects launch outside envelope opportunity", () => {
    const opportunities = detectMissedOpportunities(createDebriefEventsFixture());

    expect(opportunities.length).toBeGreaterThan(0);
    expect(opportunities[0]?.reasonCode).toBe(ReasonCode.LaunchRefusedOutsideEnvelope);
  });
});

describe("mission debrief summary", () => {
  it("builds mission debrief summary", () => {
    const summary = buildMissionDebriefSummary({
      finalSnapshot: createDebriefSnapshotFixture(),
      score: createDebriefScoreFixture(),
      timelineEntries: createDebriefTimelineFixture(),
      events: createDebriefEventsFixture(),
    });

    expect(summary.score.totalScore).toBe(780);
    expect(summary.reasonChain.entries.length).toBeGreaterThan(0);
    expect(summary.sections.length).toBeGreaterThan(0);
  });

  it("renders mission debrief summary text", () => {
    const summary = buildMissionDebriefSummary({
      finalSnapshot: createDebriefSnapshotFixture(),
      score: createDebriefScoreFixture(),
      timelineEntries: createDebriefTimelineFixture(),
      events: createDebriefEventsFixture(),
    });

    const output = renderDebriefSummaryText(summary);

    expect(output).toContain("AERION COMMAND");
    expect(output).toContain("MISSION DEBRIEF");
    expect(output).toContain("Mission Score");
    expect(output).toContain("Missed Opportunities");
  });
});