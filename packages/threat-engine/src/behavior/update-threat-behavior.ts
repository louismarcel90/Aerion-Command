import { ReasonCode } from "@aerion/contracts";
import type { RadarTrack } from "@aerion/domain";
import { TrackStatus } from "@aerion/domain";
import type { ThreatBehaviorConfiguration } from "./threat-behavior-configuration.js";
import { defaultThreatBehaviorConfiguration } from "./threat-behavior-configuration.js";
import { ThreatBehaviorMode } from "./threat-behavior-state.js";
import type { ThreatBehaviorState } from "./threat-behavior-state.js";

export type ThreatBehaviorUpdateResult = {
  readonly nextBehaviorState: ThreatBehaviorState;
  readonly reasonCode: ReasonCode;
};

export const updateThreatBehavior = (
  currentState: ThreatBehaviorState,
  selectedTrack: RadarTrack | null,
  isThreatLockedByOpponent: boolean,
  fuelPercentage: number,
  configuration: ThreatBehaviorConfiguration = defaultThreatBehaviorConfiguration,
): ThreatBehaviorUpdateResult => {
  if (fuelPercentage <= configuration.retreatFuelThreshold) {
    return {
      nextBehaviorState: {
        ...currentState,
        mode: ThreatBehaviorMode.Retreat,
        selectedTargetTrackId: selectedTrack?.trackId ?? currentState.selectedTargetTrackId,
        aggressionScore: reduceScore(currentState.aggressionScore, 10),
        confidenceScore: reduceScore(currentState.confidenceScore, 10),
        ticksInMode: nextTicksInMode(currentState.mode, ThreatBehaviorMode.Retreat, currentState.ticksInMode),
      },
      reasonCode: ReasonCode.ThreatRetreatedLowFuel,
    };
  }

  if (isThreatLockedByOpponent && configuration.evadeWhenLocked) {
    return {
      nextBehaviorState: {
        ...currentState,
        mode: ThreatBehaviorMode.Evade,
        selectedTargetTrackId: selectedTrack?.trackId ?? currentState.selectedTargetTrackId,
        aggressionScore: reduceScore(currentState.aggressionScore, 5),
        confidenceScore: currentState.confidenceScore,
        ticksInMode: nextTicksInMode(currentState.mode, ThreatBehaviorMode.Evade, currentState.ticksInMode),
      },
      reasonCode: ReasonCode.ThreatStartedEvasiveManeuver,
    };
  }

  if (selectedTrack === null) {
    return {
      nextBehaviorState: {
        ...currentState,
        mode: ThreatBehaviorMode.Patrol,
        selectedTargetTrackId: null,
        aggressionScore: reduceScore(
          currentState.aggressionScore,
          configuration.aggressionLossWhenNoTarget,
        ),
        confidenceScore: reduceScore(
          currentState.confidenceScore,
          configuration.confidenceLossWhenTrackStale,
        ),
        ticksInMode: nextTicksInMode(currentState.mode, ThreatBehaviorMode.Patrol, currentState.ticksInMode),
      },
      reasonCode: ReasonCode.ThreatHeldCourseNoTarget,
    };
  }

  const nextAggressionScore = increaseScore(
    currentState.aggressionScore,
    configuration.aggressionGainWhenTargetVisible,
  );

  const nextConfidenceScore =
    selectedTrack.status === TrackStatus.Locked || selectedTrack.confidencePercentage >= 70
      ? increaseScore(currentState.confidenceScore, configuration.confidenceGainWhenTrackStable)
      : reduceScore(currentState.confidenceScore, configuration.confidenceLossWhenTrackStale);

  if (nextConfidenceScore <= configuration.retreatConfidenceThreshold) {
    return {
      nextBehaviorState: {
        ...currentState,
        mode: ThreatBehaviorMode.Retreat,
        selectedTargetTrackId: selectedTrack.trackId,
        aggressionScore: nextAggressionScore,
        confidenceScore: nextConfidenceScore,
        ticksInMode: nextTicksInMode(currentState.mode, ThreatBehaviorMode.Retreat, currentState.ticksInMode),
      },
      reasonCode: ReasonCode.ThreatRetreatedLowConfidence,
    };
  }

  const nextMode =
    nextAggressionScore >= configuration.engageAggressionThreshold
      ? ThreatBehaviorMode.Engage
      : ThreatBehaviorMode.Intercept;

  return {
    nextBehaviorState: {
      ...currentState,
      mode: nextMode,
      selectedTargetTrackId: selectedTrack.trackId,
      aggressionScore: nextAggressionScore,
      confidenceScore: nextConfidenceScore,
      ticksInMode: nextTicksInMode(currentState.mode, nextMode, currentState.ticksInMode),
    },
    reasonCode:
      nextMode === ThreatBehaviorMode.Engage
        ? ReasonCode.ThreatSelectedTarget
        : ReasonCode.ThreatMaintainedIntercept,
  };
};

const increaseScore = (value: number, amount: number): number => {
  return Math.min(100, value + amount);
};

const reduceScore = (value: number, amount: number): number => {
  return Math.max(0, value - amount);
};

const nextTicksInMode = (
  previousMode: ThreatBehaviorMode,
  nextMode: ThreatBehaviorMode,
  previousTicksInMode: number,
): number => {
  return previousMode === nextMode ? previousTicksInMode + 1 : 0;
};