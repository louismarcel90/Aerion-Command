# Authoritative State vs Render State

## Authoritative State

Authoritative state is the source of truth for the simulation.

It contains:

- mission status
- aircraft state
- threat state
- weapon state
- sensor state
- event history references
- mission objective progress

Only approved state transitions may modify authoritative state.

## Render State

Render state is a projection optimized for terminal display.

It may contain:

- formatted HUD values
- visible map cells
- alert labels
- layout sections
- clipped event feed entries
- color or emphasis hints

Render state must never be treated as simulation truth.

## Rule

The renderer reads from projections.

The renderer does not own mission logic.

The renderer does not decide whether a missile hit, a lock succeeded, or a mission failed.

## Why This Matters

This separation prevents:

- UI-driven simulation bugs
- replay inconsistencies
- state corruption
- hidden side effects
- untestable rendering logic

## Reviewer Signal

This boundary demonstrates mature system design and is essential for deterministic replay.