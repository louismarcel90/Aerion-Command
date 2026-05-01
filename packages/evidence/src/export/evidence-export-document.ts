import type { MissionEvidencePack } from "../manifest/evidence-pack.js";

export type EvidenceExportDocument = {
  readonly exportedAtIso: string;
  readonly pack: MissionEvidencePack;
};