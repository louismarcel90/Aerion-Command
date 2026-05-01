# C4 Component — Mission Simulator Runtime

## Runtime Components

```txt
RuntimeContext
  scenario
  authoritative state
  kernel state
  commands
  active faults
  injected faults

Runtime Loop
  selects commands by tick
  evaluates fault windows
  runs runtime step
  accumulates events
  appends history

Runtime Step
  schedules commands
  advances kernel
  advances authoritative tick
  applies flight model
  runs radar scan
  evaluates mission engine
  builds assurance report
  emits domain-quality events
  renders premium HUD

Runtime History
  state per tick
  events per tick
  assurance per tick
  screen per tick
  kernel report per tick
  
```

## Runtime Components


ScenarioDefinition
      |
      v
Initial Authoritative State
      |
      v
RuntimeContext
      |
      v
RuntimeLoop
      |
      v
RuntimeStep
      |
      +--> Simulation Kernel
      +--> Flight Model
      +--> Sensor Engine
      +--> Mission Engine
      +--> Event Builders
      +--> Assurance Report
      +--> Render Projection
      |
      v
RuntimeHistory