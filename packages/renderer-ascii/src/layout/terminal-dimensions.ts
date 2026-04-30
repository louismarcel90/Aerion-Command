export type TerminalDimensions = {
  readonly columns: number;
  readonly rows: number;
};

export const defaultTerminalDimensions: TerminalDimensions = {
  columns: 100,
  rows: 34,
};

export const compactTerminalDimensions: TerminalDimensions = {
  columns: 80,
  rows: 24,
};

export const normalizeTerminalDimensions = (
  dimensions: TerminalDimensions,
): TerminalDimensions => {
  return {
    columns: Math.max(60, Math.floor(dimensions.columns)),
    rows: Math.max(18, Math.floor(dimensions.rows)),
  };
};