import { injectable, provides, singleton, inject } from "microinject";

import { Thing } from "../../types";

import { ThingRepository } from "../ThingRepository";

import { ThingRegistry } from "../ThingRegistry";
import { ThingEventSink } from "../ThingEventSink";

@injectable()
@singleton()
@provides(ThingRepository)
@provides(ThingRegistry)
export class ThingRepositoryImpl implements ThingRepository {
  private _things = new Map<string, Thing>();

  constructor(
    @inject(ThingEventSink) private _thingEventSink: ThingEventSink
  ) {}

  [Symbol.iterator](): IterableIterator<Thing> {
    return this._things.values();
  }

  get(thingId: string): Thing | undefined {
    return this._things.get(thingId);
  }

  addThing(thing: Thing): void {
    if (this._things.has(thing.id)) {
      throw new Error("Duplicate thingId.");
    }

    this._things.set(thing.id, thing);
    this._thingEventSink.onThingAdded(thing.id, thing);
  }

  removeThing(thingId: string): void {
    if (this._things.delete(thingId)) {
      this._thingEventSink.onThingRemoved(thingId);
    }
  }
}
