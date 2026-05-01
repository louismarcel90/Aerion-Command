# Replay Runbook

## Purpose

Replay verifies runtime event history.

## Replay Checks

- event log extracted from runtime history
- event log digest computed
- expected digest compared to actual digest
- verification stamp created

## Failure Case

If replay status is drift detected:

1. inspect event ordering
2. inspect command sequence
3. inspect digest generation
4. inspect state transition determinism