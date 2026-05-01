# Evidence Pack Specification

## Evidence Pack Fields

- evidencePackId
- evidenceVersion
- missionId
- scenarioId
- scenarioVersion
- scenarioDigest
- seed
- commandSequenceDigest
- eventLogDigest
- finalStateDigest
- missionOutcome
- replayVerificationStatus
- boundedSimplificationReference
- generatedAtIso

## Integrity Summary

The evidence integrity summary checks:

- scenario digest verified
- command digest verified
- event log digest verified
- final state digest present
- replay verified

## Evidence Trust Rule

Evidence is strongest when:

- replay is verified
- digests match
- final state digest is present
- scenario version is explicit