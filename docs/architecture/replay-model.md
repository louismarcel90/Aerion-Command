# Replay and Evidence Model

## Replay Purpose

Replay is not an animation feature.

Replay is used to verify that runtime history can be reconstructed and checked against expected digests.

## Replay Inputs

- ordered event log
- expected digest
- initial replay tick

## Replay Outputs

- replay session
- replay timeline
- verification stamp
- drift detection result

## Evidence Pack

Evidence packs include:

- scenario digest
- command sequence digest
- event log digest
- final state digest
- mission outcome
- replay verification status
- debrief summary

## Digest Strategy

Digest generation uses stable stringification and SHA-256.

## Trust Rule

If replay verification fails, the replay is not trusted as evidence.