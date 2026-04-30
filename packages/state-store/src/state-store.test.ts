import { describe, expect, it } from "vitest";
import { MissionPhase, MissionStatus } from "@aerion/contracts";
import {
  createInitialStateFixture,
  advanceStateTick,
  buildAuthoritativeSnapshot,
  transitionMissionPhase,
  transitionMissionStatus,
  verifyStateIntegrity,
} from "./index.js";

describe("authoritative simulation state", () => {
  it("creates an initial state with planned briefing status", () => {
    const state = createInitialStateFixture();

    expect(state.missionStatus).toBe(MissionStatus.Planned);
    expect(state.missionPhase).toBe(MissionPhase.Briefing);
    expect(state.tick).toBe(0);
    expect(state.aircraft).toHaveLength(1);
    expect(state.objectives).toHaveLength(1);
    expect(state.stateDigest.length).toBe(64);
  });

  it("advances state tick and updates digest", () => {
    const state = createInitialStateFixture();
    const nextState = advanceStateTick(state);

    expect(nextState.tick).toBe(1);
    expect(nextState.stateDigest).not.toBe(state.stateDigest);
  });

  it("transitions mission status and updates digest", () => {
    const state = createInitialStateFixture();
    const activeState = transitionMissionStatus(state, MissionStatus.Active);

    expect(activeState.missionStatus).toBe(MissionStatus.Active);
    expect(activeState.stateDigest).not.toBe(state.stateDigest);
  });

  it("transitions mission phase and updates digest", () => {
    const state = createInitialStateFixture();
    const contactState = transitionMissionPhase(state, MissionPhase.Contact);

    expect(contactState.missionPhase).toBe(MissionPhase.Contact);
    expect(contactState.stateDigest).not.toBe(state.stateDigest);
  });

  it("builds an authoritative snapshot from state", () => {
    const state = createInitialStateFixture();
    const snapshot = buildAuthoritativeSnapshot(state);

    expect(snapshot.missionId).toBe(state.missionId);
    expect(snapshot.scenarioId).toBe(state.scenarioId);
    expect(snapshot.tick).toBe(state.tick);
    expect(snapshot.aircraft).toHaveLength(1);
    expect(snapshot.snapshotDigest).toBe(state.stateDigest);
  });

  it("verifies state integrity", () => {
    const state = createInitialStateFixture();
    const report = verifyStateIntegrity(state);

    expect(report.passed).toBe(true);
    expect(report.checkedInvariantCount).toBeGreaterThan(0);
    expect(report.violations).toHaveLength(0);
  });
});