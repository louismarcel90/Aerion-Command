import type { SimulationSeed } from "@aerion/contracts";

export type SeededRandomProvider = {
  readonly seed: SimulationSeed;
  readonly next: () => readonly [number, SeededRandomProvider];
};

const MODULUS = 2147483647;
const MULTIPLIER = 48271;

export const createSeededRandomProvider = (
  seed: SimulationSeed,
): SeededRandomProvider => {
  const normalizedSeed = normalizeSeed(seed);

  return createProviderFromInternalSeed(normalizedSeed as SimulationSeed);
};

const createProviderFromInternalSeed = (
  seed: SimulationSeed,
): SeededRandomProvider => {
  return {
    seed,
    next: () => {
      const nextSeed = ((seed * MULTIPLIER) % MODULUS) as SimulationSeed;
      const value = nextSeed / MODULUS;

      return [value, createProviderFromInternalSeed(nextSeed)] as const;
    },
  };
};

const normalizeSeed = (seed: SimulationSeed): number => {
  const normalized = seed % MODULUS;

  if (normalized <= 0) {
    return normalized + MODULUS - 1;
  }

  return normalized;
};