import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { EventEventSink } from "../components";
import {
  EventEventSource,
  ThingEventAddedEventArgs,
  ThingEventRemovedEventArgs,
  ThingEventRaisedEventArgs,
} from "../services";

import { ThingEvent, ThingEventRecord } from "../types";

@injectable()
@singleton()
@provides(EventEventSource)
@provides(EventEventSink)
export class EventEventSourceImpl extends EventEmitter
  implements EventEventSource, EventEventSink {
  onEventAdded(event: ThingEvent): void {
    const e: ThingEventAddedEventArgs = {
      thingId: event.thingId,
      eventId: event.id,
      event,
    };
    this.emit("event.add", e);
  }

  onEventRaised(event: ThingEvent, record: ThingEventRecord): void {
    const e: ThingEventRaisedEventArgs = {
      thingId: event.thingId,
      eventId: event.id,
      event,
      record,
    };
    this.emit("event.raise", e);
  }

  onEventRemoved(event: ThingEvent): void {
    const e: ThingEventRemovedEventArgs = {
      thingId: event.thingId,
      eventId: event.id,
      event,
    };
    this.emit("event.remove", e);
  }
}
