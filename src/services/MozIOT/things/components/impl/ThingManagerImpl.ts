import { EventEmitter } from "events";

import { cloneDeep } from "lodash";

import { inject, injectable } from "microinject";

import {
  ThingSource,
  ThingDefEventArgs,
  ThingIdEventArgs,
  ThingContext
} from "../../contracts";

import { Thing } from "../Thing";
import { ThingFactory } from "../ThingFactory";
import { ThingManager } from "../ThingManager";

@injectable(ThingManager)
export class ThingManagerImpl extends EventEmitter implements ThingManager {
  private _things = new Map<string, Thing>();

  constructor(
    @inject(ThingFactory) private _thingFactory: ThingFactory,
    @inject(ThingSource, { all: true }) private _thingSources: ThingSource[]
  ) {
    super();

    this._thingSources.forEach(source => {
      source.on("thing.add", this._onThingAdded.bind(this, source));
      source.on("thing.remove", this._onThingRemoved.bind(this, source));

      source.things.forEach(def =>
        this._onThingAdded(source, {
          thingId: def.thingId,
          thingDef: def
        })
      );
    });
  }

  get things(): ReadonlyArray<Thing> {
    return Object.freeze(Array.from(this._things.values()));
  }

  private _onThingAdded(source: ThingSource, e: ThingDefEventArgs) {
    const externalId = this._createExternalId(e.thingDef.thingId, source);
    if (this._things.has(externalId)) {
      return;
    }

    const context: ThingContext = {
      ...e.thingDef,
      thingId: externalId,
      thingSourceThingId: e.thingId,
      thingSourceId: source.id,
      thingMetadata: e.thingDef.thingMetadata
        ? cloneDeep(e.thingDef.thingMetadata)
        : {}
    };

    const thing = this._thingFactory.createThing(context);

    this._things.set(externalId, thing);

    this.emit("thing.add", {
      thingId: e.thingId,
      thing: thing
    });
  }

  private _onThingRemoved(source: ThingSource, e: ThingIdEventArgs) {
    const externalId = this._createExternalId(e.thingId, source);
    if (!this._things.delete(externalId)) {
      return;
    }

    this.emit("thing.remove", {
      thingId: externalId
    });
  }

  private _createExternalId(defId: string, source: ThingSource) {
    return `${source.id}--${defId}`;
  }
}
