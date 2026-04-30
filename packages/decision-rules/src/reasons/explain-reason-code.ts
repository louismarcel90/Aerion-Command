import { ReasonCode } from "@aerion/contracts";
import type { ReasonCode as ReasonCodeType } from "@aerion/contracts";
import type { ReasonExplanation } from "./reason-explanation.js";

export const explainReasonCode = (reasonCode: ReasonCodeType): ReasonExplanation => {
  switch (reasonCode) {
    case ReasonCode.MissionStarted:
      return buildExplanation(
        reasonCode,
        "Mission started",
        "The mission transitioned from planning into active execution.",
        "Continue monitoring mission phase, aircraft state, and objective progress.",
      );

    case ReasonCode.MissionSucceededObjectiveComplete:
      return buildExplanation(
        reasonCode,
        "Mission succeeded",
        "All required mission objectives were completed.",
        "Review the timeline and evidence manifest to confirm the success path.",
      );

    case ReasonCode.MissionFailedPlayerDestroyed:
      return buildExplanation(
        reasonCode,
        "Mission failed: player destroyed",
        "The player aircraft was destroyed before mission completion.",
        "Review threat windows, evasive timing, RWR alerts, and countermeasure usage.",
      );

    case ReasonCode.MissionFailedEscortDestroyed:
      return buildExplanation(
        reasonCode,
        "Mission failed: escort destroyed",
        "An escort-critical objective failed because an escort aircraft was destroyed.",
        "Review prioritization, threat selection, and defensive positioning.",
      );

    case ReasonCode.LaunchAuthorized:
      return buildExplanation(
        reasonCode,
        "Launch authorized",
        "Weapon launch was approved because inventory, cooldown, stable lock, and launch envelope checks passed.",
        "Confirm post-launch missile lifecycle and target response.",
      );

    case ReasonCode.LaunchRefusedNoStableLock:
      return buildExplanation(
        reasonCode,
        "Launch refused: no stable lock",
        "The weapon system refused launch because the target track was missing or not stable enough.",
        "Improve radar confidence or reacquire the target before attempting launch.",
      );

    case ReasonCode.LaunchRefusedOutsideEnvelope:
      return buildExplanation(
        reasonCode,
        "Launch refused: outside envelope",
        "The target was outside the configured launch range or angle constraints.",
        "Adjust heading, range, or position before firing.",
      );

    case ReasonCode.LaunchRefusedWeaponCooldownActive:
      return buildExplanation(
        reasonCode,
        "Launch refused: cooldown active",
        "The weapon system rejected launch because the aircraft was still inside cooldown.",
        "Wait until cooldown expires before attempting another launch.",
      );

    case ReasonCode.LaunchRefusedNoInventory:
      return buildExplanation(
        reasonCode,
        "Launch refused: no inventory",
        "The aircraft had no available missile inventory.",
        "Use remaining systems or abort engagement depending on mission doctrine.",
      );

    case ReasonCode.LockAcquired:
      return buildExplanation(
        reasonCode,
        "Radar lock acquired",
        "The sensor engine promoted a radar track into a lock based on confidence and freshness.",
        "Weapon authorization may now evaluate the launch envelope.",
      );

    case ReasonCode.LockFailedConfidenceTooLow:
      return buildExplanation(
        reasonCode,
        "Lock failed: confidence too low",
        "The radar track did not meet the confidence threshold required for lock.",
        "Continue scanning or close distance to improve track confidence.",
      );

    case ReasonCode.LockDroppedSignalDegraded:
      return buildExplanation(
        reasonCode,
        "Lock dropped: signal degraded",
        "The lock was lost because the track became stale or sensor confidence degraded.",
        "Treat target data as unreliable until reacquired.",
      );

    case ReasonCode.MissileHitConfirmed:
      return buildExplanation(
        reasonCode,
        "Missile hit confirmed",
        "The missile resolution model confirmed a successful hit.",
        "Review whether the hit satisfied mission objectives.",
      );

    case ReasonCode.MissileMissedCountermeasureEffective:
      return buildExplanation(
        reasonCode,
        "Missile missed: countermeasure effective",
        "The missile missed because target countermeasures reduced hit probability enough to defeat the shot.",
        "Review launch timing and target defensive state.",
      );

    case ReasonCode.MissileMissedTargetEvasiveWindow:
      return buildExplanation(
        reasonCode,
        "Missile missed: evasive window",
        "The target avoided the missile during the resolution window.",
        "Review target maneuver timing and whether the launch occurred inside a strong envelope.",
      );

    case ReasonCode.ReplayVerified:
      return buildExplanation(
        reasonCode,
        "Replay verified",
        "Replay reconstruction matched the expected digest.",
        "The mission history is consistent with the stored replay evidence.",
      );

    case ReasonCode.ReplayDriftDetected:
      return buildExplanation(
        reasonCode,
        "Replay drift detected",
        "Replay reconstruction produced a different digest from the expected digest.",
        "Investigate event ordering, snapshot versioning, and deterministic state transitions.",
      );

    case ReasonCode.ReplayChecksumMismatch:
      return buildExplanation(
        reasonCode,
        "Replay checksum mismatch",
        "Replay verification detected a checksum mismatch.",
        "Treat the replay as untrusted until the history and snapshots are reconciled.",
      );

    default:
      return buildExplanation(
        reasonCode,
        "Reason recorded",
        "The system recorded a reason code for this outcome.",
        "Inspect the surrounding mission events for additional context.",
      );
  }
};

const buildExplanation = (
  reasonCode: ReasonCodeType,
  title: string,
  explanation: string,
  operatorGuidance: string,
): ReasonExplanation => {
  return {
    reasonCode,
    title,
    explanation,
    operatorGuidance,
  };
};