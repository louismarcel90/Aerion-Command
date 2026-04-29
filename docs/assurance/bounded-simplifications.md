# Bounded Simplifications

AERION COMMAND is a tactical simulation system, not a certified flight model or real-world weapons simulator.

This document defines what the system intentionally simplifies.

## Simplified Areas

### Flight Physics

The flight model uses simplified heading, speed, turn rate, altitude, and fuel behavior.

It does not model full aerodynamics.

### Sensors

The sensor model uses simplified radar detection, track confidence, stale track decay, and RWR alerts.

It does not model real radar physics.

### Weapons

The weapon model uses deterministic or seeded probabilistic resolution depending on scenario rules.

It does not model real missile dynamics.

### Threat Behavior

Threat behavior uses explainable rules and state machines.

It does not use black-box AI.

### Geography

Airspace is represented as a simplified tactical grid.

It does not model real terrain or air traffic constraints.

## Why These Simplifications Exist

The goal is not real-world military fidelity.

The goal is to demonstrate:

- deterministic simulation architecture
- mission assurance design
- replay verification
- explainable outcomes
- fault handling
- premium terminal interaction

## Interpretation Rule

Simulation outcomes should be interpreted as system outcomes within the defined model, not as real-world tactical predictions.