# Deterministic Tests

## Required Determinism Checks

- same scenario produces same initial state digest
- same command sequence produces same command digest
- same event log produces same event digest
- replay detects digest drift
- runtime history digest is stable

## Anti-Patterns

- direct `Math.random()` inside engines
- wall-clock time inside simulation logic
- rendering logic mutating simulation state