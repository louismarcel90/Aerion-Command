import { describe, expect, it } from "vitest";
import { SimulationEventType } from "@aerion/contracts";
import {
  asEventId,
  asSimulationTick,
  createInMemoryEventSink,
  createMissionStatusChangedEventFixture,
  createTypedEventBus,
  sortSimulationEvents,
} from "./index.js";

describe("event ordering", () => {
  it("sorts events by tick and event id", () => {
    const lateEvent = createMissionStatusChangedEventFixture(
      asEventId("event-b"),
      asSimulationTick(2),
    );

    const earlyEvent = createMissionStatusChangedEventFixture(
      asEventId("event-a"),
      asSimulationTick(1),
    );

    const ordered = sortSimulationEvents([lateEvent, earlyEvent]);

    expect(ordered[0]?.eventId).toBe("event-a");
    expect(ordered[1]?.eventId).toBe("event-b");
  });
});

describe("in-memory event sink", () => {
  it("appends and reads ordered events", () => {
    const firstEvent = createMissionStatusChangedEventFixture(
      asEventId("event-2"),
      asSimulationTick(2),
    );

    const secondEvent = createMissionStatusChangedEventFixture(
      asEventId("event-1"),
      asSimulationTick(1),
    );

    const sink = createInMemoryEventSink().append(firstEvent).append(secondEvent);

    expect(sink.readAll().map((event) => event.eventId)).toEqual(["event-1", "event-2"]);
  });

  it("clears events immutably", () => {
    const event = createMissionStatusChangedEventFixture(
      asEventId("event-1"),
      asSimulationTick(1),
    );

    const sink = createInMemoryEventSink().append(event);
    const clearedSink = sink.clear();

    expect(sink.readAll()).toHaveLength(1);
    expect(clearedSink.readAll()).toHaveLength(0);
  });
});

describe("typed event bus", () => {
  it("publishes events into the sink", () => {
    const event = createMissionStatusChangedEventFixture(
      asEventId("event-1"),
      asSimulationTick(1),
    );

    const bus = createTypedEventBus(createInMemoryEventSink()).publish(event);

    expect(bus.getSink().readAll()).toHaveLength(1);
  });

  it("notifies matching subscribers", () => {
    const event = createMissionStatusChangedEventFixture(
      asEventId("event-1"),
      asSimulationTick(1),
    );

    let handledCount = 0;

    const subscribedBus = createTypedEventBus(createInMemoryEventSink()).subscribe(
      SimulationEventType.MissionStatusChanged,
      () => {
        handledCount += 1;
      },
    );

    subscribedBus.publish(event);

    expect(handledCount).toBe(1);
  });
});