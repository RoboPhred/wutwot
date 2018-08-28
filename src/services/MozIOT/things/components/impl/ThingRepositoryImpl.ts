import { EventEmitter } from "events";

import { injectable, provides, singleton, inject } from "microinject";

import { Thing, ThingDef } from "../../types";

import { ThingRepository } from "../ThingRepository";

import {
  ThingRegistry,
  ThingAddedEventArgs,
  ThingRemovedEventArgs
} from "../ThingRegistry";

import { ThingFactory } from "../ThingFactory";

@injectable()
@singleton()
@provides(ThingRepository)
@provides(ThingRegistry)
export class ThingRepositoryImpl extends EventEmitter
  implements ThingRepository {
  private _things = new Map<string, Thing>();

  constructor(@inject(ThingFactory) private _thingFactory: ThingFactory) {
    super();
  }

  [Symbol.iterator](): IterableIterator<Thing> {
    return this._things.values();
  }

  get(thingId: string): Thing | undefined {
    return this._things.get(thingId);
  }

  addThing(def: ThingDef): void {
    const thing = this._thingFactory.createThing(def);
    if (this._things.has(thing.id)) {
      throw new Error("Duplicate thingId.");
    }

    this._things.set(thing.id, thing);

    const e: ThingAddedEventArgs = {
      thingId: thing.id,
      thing
    };
    this.emit("thing.add", e);
  }

  removeThing(thingId: string): void {
    if (this._things.delete(thingId)) {
      const e: ThingRemovedEventArgs = {
        thingId
      };
      this.emit("thing.remove", e);
    }
  }
}
