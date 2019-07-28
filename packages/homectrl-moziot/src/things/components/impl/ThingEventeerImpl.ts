import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import {
  ThingEventSource,
  ThingAddedEventArgs,
  ThingRemovedEventArgs
} from "../../services";

import { ThingEventSink } from "../ThingEventSink";
import { Thing } from "../../types";

@injectable()
@singleton()
@provides(ThingEventSource)
@provides(ThingEventSink)
export class ThingEventeerImpl extends EventEmitter
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
