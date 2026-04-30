import type { CommandId, ReasonCode, SimulationTick } from "@aerion/contracts";
import type { TerminalKey } from "../keys/terminal-key.js";
import type { InputMappingResultType } from "../mapping/input-mapping-result.js";

export type InputTraceEntry = {
  readonly tick: SimulationTick;
  readonly rawKey: string;
  readonly normalizedKey: TerminalKey;
  readonly mappingResultType: InputMappingResultType;
  readonly commandId: CommandId | null;
  readonly accepted: boolean;
  readonly reasonCode: ReasonCode | null;
};