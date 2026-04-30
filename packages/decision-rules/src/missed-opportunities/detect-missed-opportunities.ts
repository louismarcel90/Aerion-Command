import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { SimulationEvent } from "@aerion/contracts";
import type { MissedOpportunity } from "./missed-opportunity.js";

export const detectMissedOpportunities = (
  events: readonly SimulationEvent[],
): readonly MissedOpportunity[] => {
  return events.flatMap((event) => {
    if (
      event.type === SimulationEventType.WeaponLaunchRejected &&
      event.reasonCode === ReasonCode.LaunchRefusedOutsideEnvelope
    ) {
      return [
        {
          tick: event.occurredAtTick,
          label: "Weapon launch attempted outside the launch envelope.",
          reasonCode: event.reasonCode,
        },
      ];
    }

    if (
      event.type === SimulationEventType.WeaponLaunchRejected &&
      event.reasonCode === ReasonCode.LaunchRefusedNoStableLock
    ) {
      return [
        {
          tick: event.occurredAtTick,
          label: "Weapon launch attempted without a stable lock.",
          reasonCode: event.reasonCode,
        },
      ];
    }

    if (
      event.type === SimulationEventType.RadarLockLost ||
      event.reasonCode === ReasonCode.LockDroppedSignalDegraded
    ) {
      return [
        {
          tick: event.occurredAtTick,
          label: "Target track was lost or degraded during engagement.",
          reasonCode: event.reasonCode,
        },
      ];
    }

    return [];
  });
};