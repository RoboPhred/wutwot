import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { ThingEventSink } from "../components";
import { Thing } from "../types";

import {
  ThingEventSource,
  ThingAddedEventArgs,
  ThingRemovedEventArgs,
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
      thing,
    };
    this.emit("thing.add", e);
  }

  onThingRemoved(thing: Thing): void {
    const e: ThingRemovedEventArgs = {
      thingId: thing.id,
      thing,
    };
    this.emit("thing.remov", e);
  }
}
