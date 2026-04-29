# ADR 002: Deterministic Tick Kernel

## Status

Accepted

## Context

AERION COMMAND requires replay, debrief, evidence generation, and consistent scenario evaluation.

These capabilities are not reliable if simulation behavior depends on wall-clock timing, ambient randomness, or rendering cadence.

## Decision

The simulation will use a deterministic tick-based kernel.

Each simulation step will execute in a stable order.

The same scenario, seed, and command sequence must produce the same mission result.

## Consequences

Benefits:

- reliable replay
- easier debugging
- deterministic testing
- evidence generation
- stronger assurance story

Costs:

- more careful input handling
- no direct dependence on real-time frame timing
- requires controlled randomness

## Execution Order

A tick should follow a stable execution order:

1. scheduled commands
2. flight model
3. sensor model
4. weapon model
5. threat model
6. mission model
7. invariant checks
8. event emission
9. render projection

## Alternatives Considered

### Real-Time Frame-Based Simulation

Rejected because frame timing can introduce nondeterminism.

### Event-Only Simulation

Rejected because tactical movement and sensor updates are easier to reason about with explicit ticks.