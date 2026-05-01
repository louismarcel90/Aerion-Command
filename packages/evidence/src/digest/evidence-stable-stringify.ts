export type EvidenceJsonPrimitive = string | number | boolean | null;

export type EvidenceJsonObject = {
  readonly [key: string]: EvidenceJsonValue;
};

export type EvidenceJsonArray = readonly EvidenceJsonValue[];

export type EvidenceJsonValue =
  | EvidenceJsonPrimitive
  | EvidenceJsonObject
  | EvidenceJsonArray;

export const evidenceStableStringify = (value: EvidenceJsonValue): string => {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => evidenceStableStringify(item)).join(",")}]`;
  }

  const entries = Object.entries(value).sort(([leftKey], [rightKey]) =>
    leftKey.localeCompare(rightKey),
  );

  return `{${entries
    .map(([key, entryValue]) => `${JSON.stringify(key)}:${evidenceStableStringify(entryValue)}`)
    .join(",")}}`;
};