# ADR 005: Authoritative State vs Render State

## Status

Accepted

## Context

AERION COMMAND has a terminal renderer, but the renderer must not become the source of truth.

If rendered values are treated as simulation truth, replay and state verification become unreliable.

## Decision

The system will separate authoritative simulation state from render state.

Authoritative state owns mission truth.

Render state is only a projection for terminal display.

## Consequences

Benefits:

- cleaner architecture
- safer replay
- stronger testing
- fewer UI-driven bugs
- clear mission-assurance boundary

Costs:

- requires projection logic
- more explicit data flow
- additional mapping layer between state and terminal output

## Rule

The renderer may format and display.

The renderer may not decide domain outcomes.

The renderer may not mutate authoritative state.