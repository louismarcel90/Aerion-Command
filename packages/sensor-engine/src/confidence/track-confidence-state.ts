export const TrackConfidenceState = {
  None: "NONE",
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
  Stable: "STABLE",
} as const;

export type TrackConfidenceState =
  (typeof TrackConfidenceState)[keyof typeof TrackConfidenceState];

export const classifyTrackConfidence = (confidencePercentage: number): TrackConfidenceState => {
  if (confidencePercentage <= 0) {
    return TrackConfidenceState.None;
  }

  if (confidencePercentage < 40) {
    return TrackConfidenceState.Low;
  }

  if (confidencePercentage < 70) {
    return TrackConfidenceState.Medium;
  }

  if (confidencePercentage < 90) {
    return TrackConfidenceState.High;
  }

  return TrackConfidenceState.Stable;
};