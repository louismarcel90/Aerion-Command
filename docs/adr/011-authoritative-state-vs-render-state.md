# ADR 011 — Tick-Based Simulation Engine

## Status

Accepted

## Context

The simulator must support deterministic replay, auditability and mission debriefs.

Frame-time-based simulation would make replay harder and would couple runtime correctness to terminal rendering speed.

## Decision

Use a tick-based simulation model.

Each runtime step advances simulation state by one deterministic tick.

## Consequences

Positive:

- easier replay
- easier event ordering
- easier testing
- stable mission timelines

Tradeoff:

- less physically realistic than continuous simulation
- requires explicit tick duration semantics later