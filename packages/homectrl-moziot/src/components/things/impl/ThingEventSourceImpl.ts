import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { ThingEventSink } from "../components";
import { Thing } from "../types";

import {
  ThingEventSource,
  ThingAddedEventArgs,
  ThingRemovedEventArgs
} from "../services";

@injectable()
@singleton()
@provides(ThingEventSource)
@provides(ThingEventSink)
export class ThingEventSourceImpl extends EventEmitter
  implements ThingEventSource, ThingEventSink {
  onThingAdded(thing: Thing): void {
    const e: ThingAddedEventArgs = {
      thingId: thing.id,
      thing
    };
    this.emit("thing.added", e);
  }

  onThingRemoved(thingId: string): void {
    const e: ThingRemovedEventArgs = {
      thingId
    };
    this.emit("thing.removed", e);
  }
}