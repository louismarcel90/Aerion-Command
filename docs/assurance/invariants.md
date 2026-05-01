# Assurance Invariants

## Mission Invariants

- A succeeded mission must have completed objectives.
- A terminal mission must not accept live commands.

## Sensor Invariants

- A stale track must not retain high confidence.
- An aircraft lock requires a stable locked track.

## Weapon Invariants

- Weapon inventory must never be negative.
- Destroyed missile lifecycle state must remain valid.

## State Integrity

- Authoritative state digest must match recomputed digest.
- Render state must not mutate authoritative state.

## Purpose

Invariants make mission behavior reviewable and defensible.