export const ScenarioKind = {
  Training: "TRAINING",
  Combat: "COMBAT",
  Degraded: "DEGRADED",
  Failure: "FAILURE",
  Showcase: "SHOWCASE",
  Evaluation: "EVALUATION",
} as const;

export type ScenarioKind = (typeof ScenarioKind)[keyof typeof ScenarioKind];