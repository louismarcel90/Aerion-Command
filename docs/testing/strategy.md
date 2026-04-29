# Testing Strategy

AERION COMMAND requires a testing strategy that supports deterministic simulation, mission assurance, and terminal rendering confidence.

## Test Categories

## 1. Contract Tests

Ensure commands, events, statuses, reason codes, and snapshots remain stable.

## 2. Domain Tests

Verify pure domain rules and value objects.

## 3. Simulation Kernel Tests

Verify deterministic tick execution.

The same scenario, seed, and command sequence must produce the same result.

## 4. State Store Tests

Verify reducers, snapshots, serialization, and integrity checks.

## 5. Engine Tests

Verify flight, sensor, weapon, threat, and mission behavior independently.

## 6. Scenario Tests

Run full scenario fixtures and assert expected outcomes.

## 7. Fault Tests

Verify degraded behavior and injected failures.

## 8. Replay Tests

Verify event history reconstruction and drift detection.

## 9. Render Smoke Tests

Verify renderer output does not crash and respects layout constraints.

## 10. Benchmark Tests

Measure tick cost, replay throughput, and render cost.

## Quality Rule

A feature is not complete until it has at least one relevant test path.