# Evidence Pack Specification

The evidence pack is a structured mission artifact.

It summarizes what happened, why it happened, and whether the mission can be replayed consistently.

## Required Fields

- evidence version
- scenario id
- scenario version
- scenario digest
- seed
- command sequence digest
- event log digest
- final state digest
- mission outcome
- outcome reason codes
- replay verification status
- generated timestamp
- bounded simplification reference

## Purpose

The evidence pack supports:

- mission debrief
- replay verification
- debugging
- showcase storytelling
- assurance review

## Replay Verification Status

Valid statuses:

- `VERIFIED`
- `DRIFT_DETECTED`
- `CHECKSUM_MISMATCH`
- `NOT_REPLAYED`

## Evidence Rule

An evidence pack is not a screenshot.

It is a structured, verifiable summary of mission execution.