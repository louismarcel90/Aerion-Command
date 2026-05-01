# Testing Strategy

AERION COMMAND uses layered testing.

## Test Categories

- unit tests for pure domain functions
- engine tests for flight, sensor, weapon, threat and mission behavior
- assurance tests for invariants and degraded policies
- replay tests for digest verification
- runtime integration tests
- showcase smoke tests

## Quality Bar

Before commit:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build