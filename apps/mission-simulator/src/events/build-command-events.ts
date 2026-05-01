import { ReasonCode, SimulationEventType } from "@aerion/contracts";
import type { MissionCommand, MissionId, SimulationEvent } from "@aerion/contracts";
import { buildRuntimeEventId } from "./runtime-event-id.js";

export const buildCommandReceivedEvents = (
  missionId: MissionId,
  commands: readonly MissionCommand[],
): readonly SimulationEvent[] => {
  return commands.map((command, index) => ({
    eventId: buildRuntimeEventId("command-received", command.issuedAtTick, index),
    missionId,
    occurredAtTick: command.issuedAtTick,
    type: SimulationEventType.CommandReceived,
    commandId: command.commandId,
    reasonCode: ReasonCode.CommandAccepted,
  }));
};