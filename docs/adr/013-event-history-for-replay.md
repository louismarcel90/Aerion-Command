# ADR 013 — Event History for Replay

## Status

Accepted

## Context

Replay, evidence and debrief require a trustworthy mission history.

## Decision

Emit domain-quality simulation events from runtime.

Events must be sorted by tick and event id.

## Consequences

Positive:

- replay-friendly
- evidence-ready
- debrief-ready
- auditable

Tradeoff:

- more event modeling work
- placeholder events are not acceptable long term