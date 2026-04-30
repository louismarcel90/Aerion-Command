export type AsciiScreen = {
  readonly lines: readonly string[];
};

export const createAsciiScreen = (lines: readonly string[]): AsciiScreen => {
  return {
    lines,
  };
};

export const renderAsciiScreenToString = (screen: AsciiScreen): string => {
  return screen.lines.join("\n");
};