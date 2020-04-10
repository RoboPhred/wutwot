import { injectable, singleton, provides, inject } from "microinject";

import { ThingDef, Thing } from "../types";
import {
  InternalThingFactory,
  ThingEventSink,
  ThingIdMapper,
} from "../components";

import { ThingsManager, InternalThing } from "../services";
import { createReadonlyMapWrapper } from "../../../immutable";

@injectable()
@singleton()
@provides(ThingsManager)
export class ThingsManagerImpl implements ThingsManager {
  private _thingsById = new Map<string, InternalThing>();
  private _readonlyThingsById = createReadonlyMapWrapper<
    string,
    InternalThing,
    Thing
  >(this._thingsById, (internal) => internal.publicProxy);

  constructor(
    @inject(InternalThingFactory) private _factory: InternalThingFactory,
    @inject(ThingEventSink) private _eventSink: ThingEventSink,
    @inject(ThingIdMapper) private _idMapper: ThingIdMapper,
  ) {}

  get publicReadonlyMap(): ReadonlyMap<string, Thing> {
    return this._readonlyThingsById;
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
