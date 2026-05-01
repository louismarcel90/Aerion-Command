# C4 Context — AERION COMMAND

## System

AERION COMMAND is a deterministic tactical air combat and mission-assurance simulator rendered through a premium ASCII terminal HUD.

## Primary Users

### Operator

Runs missions, observes tactical state, issues commands and reviews debriefs.

### Engineering Reviewer

Inspects architecture, deterministic runtime, replay verification, evidence outputs and assurance guarantees.

### Recruiter / Hiring Reviewer

Evaluates project clarity, execution quality, product thinking and technical maturity.

## External Systems

AERION COMMAND currently runs locally and does not require external services.

Future integrations may include:

- persistent event store
- OpenTelemetry collector
- dashboard backend
- scenario repository
- evidence archive

## Context Diagram

```txt
+--------------------+        +-----------------------------+
| Operator / Reviewer| -----> | AERION COMMAND              |
|                    |        | Deterministic Mission Sim   |
+--------------------+        +-----------------------------+
                                      |
                                      v
                              +----------------+
                              | Local Terminal |
                              | ASCII HUD      |
                              +----------------+
                                      |
                                      v
                              +----------------+
                              | Local Evidence |
                              | JSON Export    |
                              +----------------+