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

At launch:

---

## 🎬 Terminal Preview

---

## 📊 Example Output

---

## ⚙️ Engineering Notes

---

## 👨‍💻 Author

---

## 📄 License

MIT License
