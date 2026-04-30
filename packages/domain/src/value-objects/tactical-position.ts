export type TacticalPosition = {
  readonly x: number;
  readonly y: number;
  readonly altitudeFeet: number;
};

export const createTacticalPosition = (input: TacticalPosition): TacticalPosition => {
  return {
    x: input.x,
    y: input.y,
    altitudeFeet: Math.max(0, input.altitudeFeet),
  };
};