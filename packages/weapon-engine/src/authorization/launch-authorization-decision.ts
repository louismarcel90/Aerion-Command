import type { ReasonCode } from "@aerion/contracts";
import type { Aircraft, EngagementWindow, RadarTrack } from "@aerion/domain";

export type LaunchAuthorizationDecision = {
  readonly authorized: boolean;
  readonly sourceAircraft: Aircraft;
  readonly targetTrack: RadarTrack | null;
  readonly engagementWindow: EngagementWindow | null;
  readonly reasonCode: ReasonCode;
};