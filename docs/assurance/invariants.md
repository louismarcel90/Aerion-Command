# Invariants

Invariants define conditions that must remain true during simulation.

They protect state integrity and support mission-assurance reasoning.

## Mission Invariants

- A completed mission must not accept live commands.
- A failed mission must not transition back to active without explicit reset.
- A mission outcome must include at least one reason code.

## Weapon Invariants

- A refused launch must not reduce weapon inventory.
- A destroyed missile must not acquire a new target.
- A missile impact event must reference an active missile before resolution.
- A weapon cooldown must not be bypassed by repeated commands.

## Sensor Invariants

- A stale track must not become a stable lock without reacquisition.
- Lock confidence must not exceed the maximum confidence level.
- A degraded radar state must be visible in mission alerts when mission-relevant.

## Replay Invariants

- A verified replay must reconstruct the same final state digest.
- A replay drift must produce a replay verification failure.
- Replay mode must not accept live mutation commands.

## State Invariants

- Authoritative state is the simulation truth.
- Render state must not mutate authoritative state.
- State transitions must be explicit and traceable.

## Evidence Invariants

- Evidence packs must reference scenario id, seed, command digest, event digest, and final state digest.
- Evidence packs must include replay verification status.