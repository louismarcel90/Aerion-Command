# Architecture Overview

AERION COMMAND is organized as a deterministic simulation system with clear separation between contracts, domain model, simulation kernel, tactical engines, state store, replay, assurance, evidence, and terminal rendering.

## Architectural Goals

- deterministic simulation
- explicit package boundaries
- authoritative state management
- pure state transitions
- replayable event history
- explainable outcomes
- degraded operations
- evidence generation
- premium terminal rendering

## Core Separation

The system separates:

- command input
- simulation execution
- authoritative state
- event history
- rendered projection
- replay reconstruction
- evidence export

## High-Level Flow

```txt
User Input
   |
   v
Input System
   |
   v
Mission Command
   |
   v
Simulation Kernel
   |
   v
Tactical Engines
   |
   v
Authoritative State Store
   |
   v
Event History + Observability
   |
   +--> ASCII Renderer
   |
   +--> Replay Engine
   |
   +--> Evidence Exporter