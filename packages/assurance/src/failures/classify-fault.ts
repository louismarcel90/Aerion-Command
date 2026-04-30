import { FaultCode } from "@aerion/contracts";
import { FailureCategory } from "./failure-category.js";

export const classifyFault = (faultCode: FaultCode): FailureCategory => {
  switch (faultCode) {
    case FaultCode.RadarDegraded:
    case FaultCode.RadarBlackout:
    case FaultCode.RwrIntermittent:
    case FaultCode.TrackConfidenceCollapse:
      return FailureCategory.SensorFailure;

    case FaultCode.CommandDropped:
    case FaultCode.CommandDelayed:
      return FailureCategory.CommandPathFailure;

    case FaultCode.EventProcessingDelayed:
      return FailureCategory.EventTimingAnomaly;

    case FaultCode.ReplayChecksumMismatchInjected:
      return FailureCategory.ReplayFailure;

    case FaultCode.HudPartial:
      return FailureCategory.RenderDegradation;
  }
};