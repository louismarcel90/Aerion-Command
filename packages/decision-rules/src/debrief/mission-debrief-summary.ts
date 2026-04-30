import type { MissionId, MissionStatus } from "@aerion/contracts";
import type { MissionScore } from "@aerion/mission-engine";
import type { OutcomeReasonChain } from "../chains/outcome-reason-chain.js";
import type { DebriefSection } from "./debrief-section.js";

export type MissionDebriefSummary = {
  readonly missionId: MissionId;
  readonly outcomeStatus: MissionStatus;
  readonly score: MissionScore;
  readonly reasonChain: OutcomeReasonChain;
  readonly sections: readonly DebriefSection[];
};