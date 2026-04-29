export const MissionPhase = {
  Briefing: "BRIEFING",
  Ingress: "INGRESS",
  Contact: "CONTACT",
  Engagement: "ENGAGEMENT",
  Egress: "EGRESS",
  Debrief: "DEBRIEF",
} as const;

export type MissionPhase = (typeof MissionPhase)[keyof typeof MissionPhase];