# Runtime Flow

## One Tick

```txt
1. Select commands scheduled for current tick
2. Evaluate active fault injection window
3. Schedule commands into kernel
4. Advance simulation kernel
5. Activate mission if planned
6. Advance authoritative state tick
7. Apply flight model
8. Run radar scan
9. Evaluate mission engine
10. Build assurance report
11. Emit domain-quality simulation events
12. Project render state
13. Render premium ASCII HUD
14. Append runtime history entry

```

## Multi-Tick Loop

Initial RuntimeContext
      |
      v
Tick 0 -> RuntimeHistoryEntry
      |
      v
Tick 1 -> RuntimeHistoryEntry
      |
      v
Tick N -> RuntimeHistoryEntry
