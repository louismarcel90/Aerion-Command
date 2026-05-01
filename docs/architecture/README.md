# AERION COMMAND — Architecture

AERION COMMAND is a deterministic tactical air combat and mission-assurance simulator.

It is designed around four architectural commitments:

1. Deterministic simulation
2. Authoritative state separation
3. Replayable event history
4. Evidence-grade mission analysis

## Core Principle

The renderer never owns truth.

The authoritative simulation state is the only source of truth. The ASCII renderer only projects that state into an operator-facing terminal view.

## Architecture Documents

- `c4-context.md`
- `c4-container.md`
- `c4-component.md`
- `runtime-flow.md`
- `deterministic-simulation.md`
- `replay-and-evidence.md`

## Engineering Documentation

AERION COMMAND includes Staff/Principal-grade engineering documentation:

- `docs/architecture/` — C4, runtime flow, deterministic model, replay/evidence
- `docs/adr/` — architecture decision records
- `docs/assurance/` — invariants, failure model, evidence spec, bounded simplifications
- `docs/operations/` — mission, replay, fault injection and local runbooks
- `docs/testing/` — deterministic testing and verification strategy
- `docs/showcase/` — recruiter and Staff-level walkthroughs