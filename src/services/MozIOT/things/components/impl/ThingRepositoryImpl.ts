import { EventEmitter } from "events";

import { injectable, provides, singleton } from "microinject";

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
export class ThingRepositoryImpl extends EventEmitter
  implements ThingRepository {
  private _things = new Map<string, ThingContext>();

  get things(): ReadonlyArray<ThingContext> {
    return Array.from(this._things.values());
  }

  get(thingId: string): ThingContext | undefined {
    return this._things.get(thingId);
  }

  addThing(thing: ThingContext): void {
    if (this._things.has(thing.thingId)) {
      throw new Error("Duplicate thingId.");
    }

    thing = Object.freeze({ ...thing });
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
