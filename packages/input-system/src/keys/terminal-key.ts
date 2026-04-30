export const TerminalKey = {
  ArrowUp: "ARROW_UP",
  ArrowDown: "ARROW_DOWN",
  ArrowLeft: "ARROW_LEFT",
  ArrowRight: "ARROW_RIGHT",
  W: "W",
  S: "S",
  R: "R",
  L: "L",
  F: "F",
  C: "C",
  P: "P",
  T: "T",
  E: "E",
  Space: "SPACE",
  LeftBracket: "LEFT_BRACKET",
  RightBracket: "RIGHT_BRACKET",
  D: "D",
  Escape: "ESCAPE",
  Unsupported: "UNSUPPORTED",
} as const;

export type TerminalKey = (typeof TerminalKey)[keyof typeof TerminalKey];