import type { CommandId, ReasonCode, SimulationTick } from "@aerion/contracts";
import type { TerminalKey } from "../keys/terminal-key.js";
import type { InputMappingResultType } from "../mapping/input-mapping-result.js";
import type { InputTraceEntry } from "./input-trace-entry.js";

export type BuildInputTraceEntryInput = {
  readonly tick: SimulationTick;
  readonly rawKey: string;
  readonly normalizedKey: TerminalKey;
  readonly mappingResultType: InputMappingResultType;
  readonly commandId: CommandId | null;
  readonly accepted: boolean;
  readonly reasonCode: ReasonCode | null;
};

export const buildInputTraceEntry = (
  input: BuildInputTraceEntryInput,
): InputTraceEntry => {
  return {
    tick: input.tick,
    rawKey: input.rawKey,
    normalizedKey: input.normalizedKey,
    mappingResultType: input.mappingResultType,
    commandId: input.commandId,
    accepted: input.accepted,
    reasonCode: input.reasonCode,
  };
};