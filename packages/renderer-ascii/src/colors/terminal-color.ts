export const TerminalColor = {
  Reset: "\x1b[0m",
  Dim: "\x1b[2m",
  Bold: "\x1b[1m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Cyan: "\x1b[36m",
  White: "\x1b[37m",
} as const;

export type TerminalColor = (typeof TerminalColor)[keyof typeof TerminalColor];

export const colorize = (
  value: string,
  color: TerminalColor,
  enabled: boolean,
): string => {
  if (!enabled) {
    return value;
  }

  return `${color}${value}${TerminalColor.Reset}`;
};