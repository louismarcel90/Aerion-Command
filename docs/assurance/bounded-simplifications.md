# Bounded Simplifications

AERION COMMAND intentionally simplifies some real-world systems.

## Simplified Flight Model

The flight model includes speed, heading, altitude and fuel.

It does not claim aerodynamic fidelity.

## Simplified Radar Model

Radar uses range, angle and confidence.

It does not model full electromagnetic propagation.

## Simplified Weapon Model

Weapon resolution uses confidence, countermeasures and deterministic random samples.

It does not model real missile physics.

## Simplified Threat Model

Threat behavior is rules-based.

It is not black-box AI.

## Why These Simplifications Are Acceptable

The project optimizes for:

- deterministic architecture
- mission assurance
- replay
- evidence
- explainability
- terminal-first operator experience