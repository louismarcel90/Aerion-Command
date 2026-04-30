export type ScenarioValidationIssue = {
  readonly field: string;
  readonly message: string;
};

export type ScenarioValidationResult = {
  readonly valid: boolean;
  readonly issues: readonly ScenarioValidationIssue[];
};