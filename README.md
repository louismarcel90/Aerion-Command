# Aerion Command — _Deterministic Tactical Air Combat_

- Replay & Mission Assurance Simulator 🛩️
- Mission-grade Tactical Simulation System

> Terminal ASCII Premium. Fault Injection. Evidence Pack <br/>

![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![CLI](https://img.shields.io/badge/interface-CLI-black)


## 🧠 What is Aerion Command  / Why It Exists

AERION COMMAND simulates tactical air combat missions using a tick-based deterministic simulation kernel.

The system is designed around:

- deterministic execution
- mission-oriented simulation
- authoritative state management
- replayable event history
- reason-coded outcomes
- degraded system behavior
- evidence pack export

---

## 🧱 Core Capabilities

Given the same scenario, seed, and command sequence, AERION COMMAND must produce the same mission outcome.

That guarantee is the foundation for replay, verification, debrief, and evidence generation.

### Primary Modes

- Training Mode
- Tactical Mission Mode
- Replay Mode
- Debrief Mode
- Degraded Systems Mode
- Fault Injection Mode
- Evidence Export Mode
- Recruiter Showcase Mode

---

## 🏗 System Architecture

- Authoritative simulation state is separate from rendered terminal state.
- Rendering never owns domain logic.
- Simulation is tick-based and deterministic.
- Randomness is seeded and controlled.
- Critical outcomes are reason-coded.
- Faults and degraded modes are first-class concerns.
- Replay is a system capability, not a visual gimmick.
- Evidence packs must be generated from verifiable mission data.


---

## 🏛️ Project Structure


```bash
aerion-command/
├─ apps/
│  ├─ terminal-client/
│  ├─ mission-simulator/
│  ├─ scenario-runner/
│  ├─ replay-console/
│  └─ evidence-exporter/
│
├─ packages/
│  ├─ contracts/
│  ├─ domain/
│  ├─ simulation-kernel/
│  ├─ state-store/
│  ├─ flight-model/
│  ├─ sensor-engine/
│  ├─ weapon-engine/
│  ├─ threat-engine/
│  ├─ mission-engine/
│  ├─ decision-rules/
│  ├─ assurance/
│  ├─ replay-engine/
│  ├─ event-bus/
│  ├─ observability/
│  ├─ evidence/
│  ├─ scenario-kit/
│  ├─ renderer-ascii/
│  ├─ input-system/
│  ├─ benchmark-kit/
│  ├─ test-utils/
│  └─ shared-config/
│
├─ scenarios/
├─ docs/
├─ scripts/
└─ .github/

```

---

## 🚀 Getting Started

1. 📦 Installation

2. Run

---

## 🎮 CLI Experience

At launch, AERION COMMAND starts in **LIVE MISSION MODE** inside a premium ASCII terminal HUD.

### Controls

```txt
Arrow keys   → speed & heading control
W / S        → altitude control
R            → cycle radar target
L            → attempt target lock
F            → fire weapon (if authorized)
C            → countermeasures (flare)
P            → pause (future extension)
ESC          → exit live mode
```

### Gameplay Loop
1. Detect target via radar
2. Adjust heading and altitude
3. Stabilize flight path
4. Attempt lock
5. Validate engagement envelope
6. Fire at the right moment
7. React to alerts (missile inbound, RWR spike)

---

## 🎬 Terminal Preview

At runtime, the terminal renders a tactical HUD:

```txt
┌──────────────────────────────────────────────────────────────┐
│ AERION COMMAND — TACTICAL AIR COMBAT / MISSION OPS           │
├──────────────────────────────────────────────────────────────┤
│ MISSION: runtime-scenario-001                                │
│ STATUS : ACTIVE                                              │
│ PHASE  : INGRESS                                             │
│ TICK   : 000123                                              │
│ MODE   : LIVE                                                │
├──────────────────────────────────────────────────────────────┤
│ AIRSPACE                                                     │
│                                                              │
│             E1 >>>                                           │
│                         ^ P1                                 │
│                                                              │
│                    M1 ---> *                                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ PLAYER   SPD: 720   ALT: 18000   HDG: 034                    │
│ LOCK     E1                                                 │
│ SENSOR   RADAR: TRACKING   RWR: SPIKE                        │
│ ALERTS   [MISSILE INBOUND]                                   │
├──────────────────────────────────────────────────────────────┤
│ EVENTS                                                       │
│ [0121] radar track acquired                                  │
│ [0122] lock attempt                                          │
│ [0123] missile launched                                      │
└──────────────────────────────────────────────────────────────┘
```
---

## 📊 Example Output

After each mission (demo or replay), the system produces:

### Replay Verification

```txt
Status           : VERIFIED
Events           : 5
Expected digest  : <sha256>
Actual digest    : <sha256>
```
### Mission Debrief

```txt
OUTCOME : SUCCESS
SCORE   : 780

Mission Score
  Objective score: 250
  Survival score : 300
  Efficiency     : 230

Outcome Reason Chain
  MISSION_STARTED
  TARGET_INTERCEPTED
  COMMAND_ACCEPTED
  PHASE_ADVANCED
```
### Evidence Summary

```txt
Mission id       : mission-showcase-001
Ticks executed   : 6
Replay status    : VERIFIED
Assurance passed : true
```
---

## ⚙️ Engineering Notes

### Determinism First

- Tick-based simulation
- Seeded randomness
- Ordered event emission
- No wall-clock dependency

### Architecture Boundaries

- simulation kernel owns time
- state-store owns truth
- renderer owns projection only
- replay engine reconstructs history
- evidence system validates integrity

### Explainability

Every critical outcome is reason-coded:

```txt
LAUNCH_REFUSED_OUTSIDE_ENVELOPE
LOCK_LOST_SENSOR_CONFIDENCE_DROP
MISS_TARGET_EVASIVE_WINDOW
```

---

## 👨‍💻 Author

Built as a **Staff / Principal-level engineering portfolio project**.

Focus areas:

- deterministic systems design
- simulation architecture
- mission assurance thinking
- replay & evidence modeling
- terminal-first product experience

This project is designed to be:

- understandable in 3 minutes (recruiter)
- defensible in 15 minutes (Staff engineer)
- respectable under deep review (mission-critical mindset)

---

## 📄 License

MIT License
