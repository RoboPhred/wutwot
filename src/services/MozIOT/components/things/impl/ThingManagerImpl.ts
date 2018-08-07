import { EventEmitter } from "events";

import { inject, injectable } from "microinject";

import { ThingSource, ThingDef } from "../../../contracts/ThingSource";

import { Thing } from "../Thing";
import { ThingFactory } from "../ThingFactory";
import { ThingManager } from "../ThingManager";

@injectable(ThingManager)
export class ThingManagerImpl extends EventEmitter implements ThingManager {
  private readonly _discoveredThings = new Map<string, Thing>();

  constructor(
    @inject(ThingFactory) private _thingFactory: ThingFactory,
    @inject(ThingSource, { all: true })
    private _thingSources: ThingSource[]
  ) {
    super();
  }

  get things(): ReadonlyArray<Thing> {
    const things = Array.from(this._discoveredThings.values());
    return Object.freeze(things);
  }

  private _addThing(thingDef: ThingDef) {
    const { id } = thingDef;

    if (this._discoveredThings.has(id)) {
      return;
    }

    const thing = this._thingFactory.createThing(thingDef);
    this._discoveredThings.set(id, thing);
  }

  private _removeThing(thingDef: ThingDef) {
    this._discoveredThings.delete(thingDef.id);
  }
}
