import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { EventEventSink } from "../../components/EventEventSink";
import {
  EventEventSource,
  ThingEventAddedEventArgs,
  ThingEventRemovedEventArgs
} from "../../services";

import { ThingEvent } from "../../types";

@injectable()
@singleton()
@provides(EventEventSource)
@provides(EventEventSink)
export class EventEventSourceImpl extends EventEmitter
  implements EventEventSource, EventEventSink {
  onEventAdded(thingId: string, eventId: string, event: ThingEvent): void {
    const e: ThingEventAddedEventArgs = {
      thingId,
      eventId,
      event
    };
    this.emit("event.added", e);
  }

  onEventRemoved(thingId: string, eventId: string): void {
    const e: ThingEventRemovedEventArgs = {
      thingId,
      eventId
    };
    this.emit("event.removed", e);
  }
}
