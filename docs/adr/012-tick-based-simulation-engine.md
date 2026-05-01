# ADR 012 — Authoritative State vs Render State

## Status

Accepted

## Context

Terminal rendering must not affect mission truth.

## Decision

Separate authoritative simulation state from render state.

The renderer receives projected data only.

## Consequences

Positive:

- renderer cannot corrupt simulation
- easier testing
- strong architecture boundary
- Staff-level clarity

Tradeoff:

- requires projection layer
- some display fields are duplicated in render models