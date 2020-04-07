import { injectable, singleton, provides, inject } from "microinject";

import { ThingDef } from "../types";
import {
  InternalThingFactory,
  ThingEventSink,
  ThingIdMapper,
} from "../components";

import { ThingsManager, InternalThing } from "../services";
import { createMapProxy } from "../../../utils/proxies/map";

@injectable()
@singleton()
@provides(ThingsManager)
export class ThingsManagerImpl implements ThingsManager {
  private _thingsById = new Map<string, InternalThing>();
  private _objectAccessor: Record<string, InternalThing>;

  constructor(
    @inject(InternalThingFactory) private _factory: InternalThingFactory,
    @inject(ThingEventSink) private _eventSink: ThingEventSink,
    @inject(ThingIdMapper) private _idMapper: ThingIdMapper,
  ) {
    this._objectAccessor = createMapProxy(this._thingsById);
  }

  get objectAccessor(): Record<string, InternalThing> {
    return this, this._objectAccessor;
  }

  addThing(def: ThingDef, owner: object): InternalThing {
    const thing = this._factory.createThing(def, owner);
    this._thingsById.set(thing.id, thing);
    this._eventSink.onThingAdded(thing);
    return thing;
  }

  removeThing(thingId: string): void {
    const thing = this._thingsById.get(thingId);
    if (thing) {
      this._thingsById.delete(thingId);
      this._idMapper.retireId(thingId);
      this._eventSink.onThingRemoved(thing);
    }
  }

  getThing(thingId: string): InternalThing | undefined {
    return this._thingsById.get(thingId);
  }

  getThings(): InternalThing[] {
    return Array.from(this._thingsById.values());
  }
}
