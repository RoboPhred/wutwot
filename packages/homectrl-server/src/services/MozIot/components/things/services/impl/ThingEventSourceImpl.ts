import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { Thing } from "../../types";
import { ThingEventSink } from "../../components/ThingEventSink";

import {
  ThingEventSource,
  ThingAddedEventArgs,
  ThingRemovedEventArgs
} from "../ThingEventSource";

@injectable()
@singleton()
@provides(ThingEventSource)
@provides(ThingEventSink)
export class ThingEventSourceImpl extends EventEmitter
  implements ThingEventSource, ThingEventSink {
  onThingAdded(thingId: string, thing: Thing): void {
    const e: ThingAddedEventArgs = {
      thingId,
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
