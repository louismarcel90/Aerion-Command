import type { MissionEvidencePack } from "../manifest/evidence-pack.js";
import type { EvidenceExportDocument } from "./evidence-export-document.js";

export const buildEvidenceExportDocument = (
  pack: MissionEvidencePack,
  exportedAtIso: string,
): EvidenceExportDocument => {
  return {
    exportedAtIso,
    pack,
  };
};

export const exportEvidencePackJson = (
  pack: MissionEvidencePack,
  exportedAtIso: string,
): string => {
  return JSON.stringify(buildEvidenceExportDocument(pack, exportedAtIso), null, 2);
};