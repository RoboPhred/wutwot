import { injectable, singleton, provides, inject } from "microinject";

import { ThingDef } from "../types";
import { InternalThingFactory, ThingEventSink } from "../components";

import { ThingManager, InternalThing } from "../services";

@injectable()
@singleton()
@provides(ThingManager)
export class ThingManagerImpl implements ThingManager {
  private _thingsById = new Map<string, InternalThing>();

  constructor(
    @inject(InternalThingFactory) private _factory: InternalThingFactory,
    @inject(ThingEventSink) private _eventSink: ThingEventSink
  ) {}

  addThing(def: ThingDef, owner: object): InternalThing {
    const thing = this._factory.createThing(def, owner);
    this._thingsById.set(thing.id, thing);
    this._eventSink.onThingAdded(thing.id, thing);
    return thing;
  }

  removeThing(thingId: string): void {
    if (this._thingsById.delete(thingId)) {
      this._eventSink.onThingRemoved(thingId);
    }
  }

  getThing(thingId: string): InternalThing | undefined {
    return this._thingsById.get(thingId);
  }

  getThings(): InternalThing[] {
    return Array.from(this._thingsById.values());
  }
}
