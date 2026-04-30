import { ReasonCode } from "@aerion/contracts";
import type { SimulationTick, TrackId } from "@aerion/contracts";
import type { Aircraft, RadarTrack } from "@aerion/domain";
import { isWeaponCooldownActive } from "../cooldown/evaluate-weapon-cooldown.js";
import type { WeaponCooldownState } from "../cooldown/weapon-cooldown-state.js";
import { evaluateLaunchEnvelope } from "./evaluate-launch-envelope.js";
import type { LaunchAuthorizationDecision } from "./launch-authorization-decision.js";
import type { WeaponEnvelopeConfiguration } from "./weapon-envelope-configuration.js";
import { defaultWeaponEnvelopeConfiguration } from "./weapon-envelope-configuration.js";

export const authorizeWeaponLaunch = (
  sourceAircraft: Aircraft,
  tracks: readonly RadarTrack[],
  targetTrackId: TrackId,
  cooldownState: WeaponCooldownState,
  currentTick: SimulationTick,
  configuration: WeaponEnvelopeConfiguration = defaultWeaponEnvelopeConfiguration,
): LaunchAuthorizationDecision => {
  const targetTrack = tracks.find((track) => track.trackId === targetTrackId) ?? null;

  if (!targetTrack) {
    return {
      authorized: false,
      sourceAircraft,
      targetTrack: null,
      engagementWindow: null,
      reasonCode: ReasonCode.LaunchRefusedNoStableLock,
    };
  }

  const engagementWindow = evaluateLaunchEnvelope(sourceAircraft, targetTrack, configuration);

  if (sourceAircraft.missileInventory <= 0) {
    return {
      authorized: false,
      sourceAircraft,
      targetTrack,
      engagementWindow,
      reasonCode: ReasonCode.LaunchRefusedNoInventory,
    };
  }

  if (isWeaponCooldownActive(cooldownState, currentTick, configuration)) {
    return {
      authorized: false,
      sourceAircraft,
      targetTrack,
      engagementWindow,
      reasonCode: ReasonCode.LaunchRefusedWeaponCooldownActive,
    };
  }

  if (!engagementWindow.isLockStable) {
    return {
      authorized: false,
      sourceAircraft,
      targetTrack,
      engagementWindow,
      reasonCode: ReasonCode.LaunchRefusedNoStableLock,
    };
  }

  if (!engagementWindow.isInsideLaunchEnvelope) {
    return {
      authorized: false,
      sourceAircraft,
      targetTrack,
      engagementWindow,
      reasonCode: ReasonCode.LaunchRefusedOutsideEnvelope,
    };
  }

  return {
    authorized: true,
    sourceAircraft,
    targetTrack,
    engagementWindow,
    reasonCode: ReasonCode.LaunchAuthorized,
  };
};