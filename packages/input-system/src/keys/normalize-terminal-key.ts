import { TerminalKey } from "./terminal-key.js";

export const normalizeTerminalKey = (rawKey: string): TerminalKey => {
  const normalized = rawKey.trim().toLowerCase();

  switch (normalized) {
    case "up":
    case "arrowup":
      return TerminalKey.ArrowUp;

    case "down":
    case "arrowdown":
      return TerminalKey.ArrowDown;

    case "left":
    case "arrowleft":
      return TerminalKey.ArrowLeft;

    case "right":
    case "arrowright":
      return TerminalKey.ArrowRight;

    case "w":
      return TerminalKey.W;

    case "s":
      return TerminalKey.S;

    case "r":
      return TerminalKey.R;

    case "l":
      return TerminalKey.L;

    case "f":
      return TerminalKey.F;

    case "c":
      return TerminalKey.C;

    case "p":
      return TerminalKey.P;

    case "t":
      return TerminalKey.T;

    case "e":
      return TerminalKey.E;

    case "space":
    case " ":
      return TerminalKey.Space;

    case "[":
    case "leftbracket":
      return TerminalKey.LeftBracket;

    case "]":
    case "rightbracket":
      return TerminalKey.RightBracket;

    case "d":
      return TerminalKey.D;

    case "escape":
    case "esc":
      return TerminalKey.Escape;

    default:
      return TerminalKey.Unsupported;
  }
};