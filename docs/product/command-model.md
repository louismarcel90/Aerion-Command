# Command Model

The command model defines how user intent enters the simulation.

Commands are not direct state mutations.

A command is an input request that must be normalized, validated, scheduled, and applied by the deterministic simulation flow.

## Core Controls

| Key | Action |
| --- | --- |
| Arrow Up | Increase speed |
| Arrow Down | Decrease speed |
| Arrow Left | Turn left |
| Arrow Right | Turn right |
| W | Climb |
| S | Descend |
| R | Cycle radar target |
| L | Attempt lock |
| F | Fire weapon if authorized |
| C | Deploy countermeasure |
| P | Pause or resume |
| T | Toggle tactical overlay |
| E | Expand event panel |

## Replay Controls

| Key | Action |
| --- | --- |
| Space | Play or pause replay |
| Right Bracket | Step forward |
| Left Bracket | Step backward when supported by snapshot checkpoints |
| D | Toggle debrief overlay |

## Command Principles

- Commands are captured with tick context.
- Commands must be deterministic when replayed.
- Commands may be rejected with reason codes.
- Commands must not mutate state directly.
- Commands must enter the simulation through the command pipeline.
- Rejected commands must be visible in logs or debrief when mission-relevant.

## Example Rejection Reasons

- `COMMAND_REJECTED_MISSION_TERMINATED`
- `COMMAND_REJECTED_SYSTEM_DEGRADED`
- `COMMAND_REJECTED_ACTION_COOLDOWN_ACTIVE`
- `COMMAND_REJECTED_REPLAY_MODE_READ_ONLY`