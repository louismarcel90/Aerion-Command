export const AsciiSymbol = {
  PlayerAircraft: "^",
  EnemyAircraft: "E",
  EscortAircraft: "A",
  NeutralAircraft: "N",
  Missile: "*",
  Track: ".",
  Cloud: "~",
  Empty: " ",
  Horizontal: "─",
  Vertical: "│",
  TopLeft: "┌",
  TopRight: "┐",
  BottomLeft: "└",
  BottomRight: "┘",
  LeftT: "├",
  RightT: "┤",
} as const;

export type AsciiSymbol = (typeof AsciiSymbol)[keyof typeof AsciiSymbol];