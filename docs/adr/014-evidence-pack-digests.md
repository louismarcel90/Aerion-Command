# ADR 014 — Evidence Pack Digests

## Status

Accepted

## Context

Mission evidence must be verifiable.

## Decision

Use stable JSON stringification and SHA-256 digests for:

- scenario
- command sequence
- event log
- final state

## Consequences

Positive:

- deterministic integrity checks
- clear audit trail
- replay verification compatibility

Tradeoff:

- schema changes require versioning discipline