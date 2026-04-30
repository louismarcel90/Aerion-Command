import type { ScenarioDefinition } from "../schema/scenario-definition.js";
import type {
  ScenarioValidationIssue,
  ScenarioValidationResult,
} from "./scenario-validation-result.js";

export const validateScenarioDefinition = (
  scenario: ScenarioDefinition,
): ScenarioValidationResult => {
  const issues: ScenarioValidationIssue[] = [];

  if (scenario.metadata.version.trim().length === 0) {
    issues.push({
      field: "metadata.version",
      message: "Scenario version is required.",
    });
  }

  if (scenario.metadata.title.trim().length === 0) {
    issues.push({
      field: "metadata.title",
      message: "Scenario title is required.",
    });
  }

  if (scenario.metadata.recommendedDurationTicks <= 0) {
    issues.push({
      field: "metadata.recommendedDurationTicks",
      message: "Recommended duration must be greater than zero.",
    });
  }

  if (scenario.aircraft.length === 0) {
    issues.push({
      field: "aircraft",
      message: "Scenario must define at least one aircraft.",
    });
  }

  if (!scenario.aircraft.some((aircraft) => aircraft.role === "PLAYER")) {
    issues.push({
      field: "aircraft",
      message: "Scenario must define one player aircraft.",
    });
  }

  if (scenario.objectives.length === 0) {
    issues.push({
      field: "objectives",
      message: "Scenario must define at least one objective.",
    });
  }

  scenario.aircraft.forEach((aircraft, index) => {
    if (aircraft.callsign.trim().length === 0) {
      issues.push({
        field: `aircraft[${index}].callsign`,
        message: "Aircraft callsign is required.",
      });
    }

    if (aircraft.fuelPercentage < 0 || aircraft.fuelPercentage > 100) {
      issues.push({
        field: `aircraft[${index}].fuelPercentage`,
        message: "Fuel percentage must be between 0 and 100.",
      });
    }

    if (aircraft.missileInventory < 0) {
      issues.push({
        field: `aircraft[${index}].missileInventory`,
        message: "Missile inventory cannot be negative.",
      });
    }

    if (aircraft.countermeasureCount < 0) {
      issues.push({
        field: `aircraft[${index}].countermeasureCount`,
        message: "Countermeasure count cannot be negative.",
      });
    }
  });

  scenario.objectives.forEach((objective, index) => {
    if (objective.label.trim().length === 0) {
      issues.push({
        field: `objectives[${index}].label`,
        message: "Objective label is required.",
      });
    }

    if (objective.priority <= 0) {
      issues.push({
        field: `objectives[${index}].priority`,
        message: "Objective priority must be greater than zero.",
      });
    }
  });

  scenario.faults.forEach((fault, index) => {
    if (fault.durationTicks <= 0) {
      issues.push({
        field: `faults[${index}].durationTicks`,
        message: "Fault duration must be greater than zero.",
      });
    }
  });

  return {
    valid: issues.length === 0,
    issues,
  };
};