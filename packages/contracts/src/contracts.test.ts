import { describe, expect, it } from "vitest";
import { MissionCommandType } from "./commands/mission-command.js";
import { FaultCode } from "./faults/fault-code.js";
import { MissionPhase } from "./mission/mission-phase.js";
import { MissionStatus } from "./mission/mission-status.js";
import { ReasonCode } from "./reasons/reason-code.js";
import { ReplayVerificationStatus } from "./replay/replay-verification-status.js";

describe("canonical contracts", () => {
  it("exposes mission statuses", () => {
    expect(MissionStatus.Active).toBe("ACTIVE");
    expect(MissionStatus.Succeeded).toBe("SUCCEEDED");
    expect(MissionStatus.Failed).toBe("FAILED");
  });

  it("exposes mission phases", () => {
    expect(MissionPhase.Briefing).toBe("BRIEFING");
    expect(MissionPhase.Engagement).toBe("ENGAGEMENT");
    expect(MissionPhase.Debrief).toBe("DEBRIEF");
  });

  it("exposes mission command types", () => {
    expect(MissionCommandType.FireWeapon).toBe("FIRE_WEAPON");
    expect(MissionCommandType.AttemptLock).toBe("ATTEMPT_LOCK");
  });

  it("exposes reason codes", () => {
    expect(ReasonCode.LaunchRefusedOutsideEnvelope).toBe("LAUNCH_REFUSED_OUTSIDE_ENVELOPE");
    expect(ReasonCode.ReplayDriftDetected).toBe("REPLAY_DRIFT_DETECTED");
  });

  it("exposes fault codes", () => {
    expect(FaultCode.RadarDegraded).toBe("RADAR_DEGRADED");
    expect(FaultCode.CommandDropped).toBe("COMMAND_DROPPED");
  });

  it("exposes replay verification statuses", () => {
    expect(ReplayVerificationStatus.Verified).toBe("VERIFIED");
    expect(ReplayVerificationStatus.ChecksumMismatch).toBe("CHECKSUM_MISMATCH");
  });
});