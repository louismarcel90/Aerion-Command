export const assertNever = (value: never): never => {
  throw new Error(`Unexpected value reached exhaustive check: ${String(value)}`);
};