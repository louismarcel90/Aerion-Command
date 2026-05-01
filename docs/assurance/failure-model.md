# Failure Model

AERION COMMAND models controlled failure modes.

## Failure Categories

- Sensor failure
- Command path failure
- Event timing anomaly
- Replay failure
- Render degradation
- State integrity failure

## Fault Codes

Examples:

- RadarDegraded
- RadarBlackout
- RwrIntermittent
- HudPartial
- CommandDropped
- CommandDelayed
- ReplayChecksumMismatchInjected

## Degraded Operations

When faults are active, the system evaluates degraded capability policy.

The mission may continue only if required assurance capabilities remain available.