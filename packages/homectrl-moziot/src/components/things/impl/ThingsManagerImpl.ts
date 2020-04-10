import { injectable, singleton, provides, inject } from "microinject";

import { ThingDef } from "../types";
import {
  InternalThingFactory,
  ThingEventSink,
  ThingIdMapper,
} from "../components";

import { ThingsManager, InternalThing } from "../services";
import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

@injectable()
@singleton()
@provides(ThingsManager)
export class ThingsManagerImpl
  extends SelfPopulatingReadonlyMap<string, InternalThing>
  implements ThingsManager {
  constructor(
    @inject(InternalThingFactory) private _factory: InternalThingFactory,
    @inject(ThingEventSink) private _eventSink: ThingEventSink,
    @inject(ThingIdMapper) private _idMapper: ThingIdMapper,
  ) {
    super();
  }

  createThing(def: ThingDef, owner: object): InternalThing {
    const thing = this._factory.createThing(def, owner);
    this._set(thing.id, thing);
    this._eventSink.onThingAdded(thing);
    return thing;
  }

  deleteThing(thingId: string): void {
    const thing = this.get(thingId);
    if (thing) {
      this._delete(thingId);
      this._idMapper.retireId(thingId);
      this._eventSink.onThingRemoved(thing);
    }
  }
}
