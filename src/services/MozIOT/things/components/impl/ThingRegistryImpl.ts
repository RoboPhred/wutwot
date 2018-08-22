import { EventEmitter } from "events";

import { injectable, provides, singleton } from "microinject";

import { ReadonlyMapWrapper } from "../../../../../immutability/ReadonlyMapWrapper";

import { ThingContext } from "../../contracts";

import { ThingRepository } from "../ThingRepository";

import {
  ThingRegistry,
  ThingAddedEventArgs,
  ThingRemovedEventArgs
} from "../ThingRegistry";

@injectable()
@singleton()
@provides(ThingRepository)
@provides(ThingRegistry)
export class ThingRegistryImpl extends EventEmitter implements ThingRegistry {
  private _things = new Map<string, ThingContext>();
  private _roThings = new ReadonlyMapWrapper(this._things);

  get things(): ReadonlyMap<string, ThingContext> {
    return this._roThings;
  }

  addThing(thing: ThingContext): void {
    if (this._things.has(thing.thingId)) {
      throw new Error("Duplicate thingId");
    }

    this._things.set(thing.thingId, thing);

    const e: ThingAddedEventArgs = {
      thingId: thing.thingId,
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
