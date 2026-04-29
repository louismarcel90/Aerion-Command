# ADR 001: Monorepo and Package Boundaries

## Status

Accepted

## Context

AERION COMMAND contains multiple concerns:

- terminal client
- simulation execution
- scenario running
- replay
- evidence export
- domain model
- tactical engines
- state management
- rendering
- testing utilities

A flat structure would make boundaries unclear and increase the risk of mixing domain logic, rendering logic, and orchestration logic.

## Decision

AERION COMMAND will use a monorepo with separate apps and packages.

Apps provide runnable entry points.

Packages provide isolated system capabilities.

## Consequences

Benefits:

- clearer ownership
- easier testing
- reusable simulation packages
- stronger architecture signal
- better long-term maintainability

Costs:

- more initial setup
- more package coordination
- stricter dependency discipline required

## Alternatives Considered

### Single Application Repository

Rejected because it would make it too easy to mix rendering, simulation, and state logic.

### Multiple Repositories

Rejected because it adds unnecessary operational overhead for a portfolio-scale project.

## Boundary Rule

Packages must not bypass contracts.

Renderer packages must not own domain decisions.

Simulation packages must not depend on terminal rendering.