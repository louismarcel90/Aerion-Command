import type { RuntimeHistory } from "./history/runtime-history.js";
import type { RuntimeDebriefResult } from "./debrief/runtime-debrief-result.js";

import { buildRuntimeDebriefSummary } from "./debrief/analysis/build-debrief-summary.js";

export const buildRuntimeDebrief = (
  history: RuntimeHistory,
): RuntimeDebriefResult => {
  const summary = buildRuntimeDebriefSummary(history);

  return {
    summary,
    history,
  };
};