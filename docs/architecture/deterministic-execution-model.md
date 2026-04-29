# Deterministic Execution Model

## Core Contract

Given the same:

- scenario definition
- seed
- initial state
- command sequence

the simulation must produce the same:

- event sequence
- state transitions
- mission outcome
- final state digest

## Determinism Requirements

The system must avoid:

- runtime-dependent randomness
- wall-clock-dependent logic
- unordered iteration over unstable structures
- render-driven state changes
- input timing that is not converted into simulation ticks

## Tick-Based Execution

The simulation advances in ticks.

Each tick follows a stable order:

1. read scheduled commands for the tick
2. validate commands
3. apply flight model
4. apply sensor model
5. apply weapon model
6. apply threat model
7. apply mission model
8. verify invariants
9. emit events
10. produce render projection

## Seeded Randomness

Randomness must come from a controlled seeded provider.

No domain or engine package may call ambient random sources directly.

## Replay Requirement

Replay must reconstruct state from recorded inputs, events, and snapshots.

Replay must detect drift when reconstructed state differs from expected digests.