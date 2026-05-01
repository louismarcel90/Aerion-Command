# C4 Container — AERION COMMAND

## Containers

```txt
apps/
  mission-simulator     Runtime integration and loop
  terminal-client       Terminal display entrypoint
  scenario-runner       Lists and previews scenarios
  evidence-exporter     Exports evidence JSON
  showcase-runner       Recruiter-ready one-command demo

packages/
  contracts             Stable system types and event contracts
  domain                Mission domain objects
  simulation-kernel     Tick, clock, scheduler, seeded random
  state-store           Authoritative state and reducers
  flight-model          Aircraft movement and safety envelope
  sensor-engine         Radar, tracks, locks and RWR
  weapon-engine         Launch authorization and missile resolution
  threat-engine         Deterministic adversary decisions
  mission-engine        Objectives, phase, outcome and score
  assurance             Invariants, degraded policy and reports
  event-bus             Typed event sink and ordering
  replay-engine         Replay sessions and digest verification
  decision-rules        Explainability and debrief summaries
  scenario-kit          Scenario schema, validation and packs
  evidence              Evidence manifest and export
  renderer-ascii        Terminal HUD projection
  input-system          Key mapping and command buffering

```

## Container Diagram

  +-------------------+
| showcase-runner   |
+---------+---------+
          |
          v
+-------------------+      +------------------+
| mission-simulator | ---> | renderer-ascii   |
+---------+---------+      +------------------+
          |
          v
+-------------------+      +------------------+
| state-store       | <--- | simulation-kernel|
+-------------------+      +------------------+
          |
          v
+------------------------------------------------------+
| Engines: flight, sensor, weapon, threat, mission     |
+------------------------------------------------------+
          |
          v
+-------------------+      +------------------+
| event-bus         | ---> | replay-engine    |
+-------------------+      +------------------+
          |
          v
+-------------------+      +------------------+
| assurance         | ---> | evidence         |
+-------------------+      +------------------+