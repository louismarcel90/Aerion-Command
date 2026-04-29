# Failure Taxonomy

AERION COMMAND treats failure as a first-class design concern.

## Sensor Failures

Examples:

- radar degradation
- radar blackout
- track confidence collapse
- stale track propagation
- RWR intermittent warning

## Command Path Failures

Examples:

- dropped command
- delayed command
- rejected command
- command received in invalid mission phase

## Event Timing Anomalies

Examples:

- delayed event processing
- out-of-order event attempt
- duplicate event attempt

## Replay Failures

Examples:

- checksum mismatch
- replay drift
- missing event history
- incompatible scenario version

## Render Degradation

Examples:

- small terminal fallback
- partial HUD mode
- event panel truncation
- degraded visual alerting

## State Integrity Failures

Examples:

- invalid mission transition
- impossible weapon state
- invalid lock state
- final digest mismatch

## Policy

Every mission-relevant failure must be visible through one or more of:

- alert
- event
- reason code
- debrief entry
- evidence manifest