# ADR 015 — Controlled Fault Injection

## Status

Accepted

## Context

Mission-assurance systems must reason about degraded operations.

Random chaos testing is not appropriate for deterministic replay foundations.

## Decision

Faults are scheduled, explicit and deterministic.

## Consequences

Positive:

- replayable failures
- testable degraded behavior
- clear operator messaging

Tradeoff:

- less exploratory than fuzzing or chaos testing
- requires curated failure scenarios