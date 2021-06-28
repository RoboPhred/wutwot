import { injectable, singleton, provides, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";
import { WutWotPlugin } from "../../plugin-management";
import { DuplicateIDError, formCompoundId } from "../../id-mapping";

import { ThingDef } from "../types";
import { InternalThingFactory, ThingEventSink } from "../components";
import { ThingsManager, InternalThing } from "../services";

@injectable()
@singleton()
@provides(ThingsManager)
export class ThingsManagerImpl
  extends SelfPopulatingReadonlyMap<string, InternalThing>
  implements ThingsManager {
  constructor(
    @inject(InternalThingFactory) private _factory: InternalThingFactory,
    @inject(ThingEventSink) private _eventSink: ThingEventSink,
  ) {
    super("ThingsManager");
  }

  createThing(def: ThingDef, owner: WutWotPlugin): InternalThing {
    const id = formCompoundId(owner.id, def.pluginLocalId);
    if (this.has(id)) {
      throw new DuplicateIDError(
        `Plugin ${owner.id} has already registered a thing with a plugin-local id of "${def.pluginLocalId}".`,
      );
    }

    const thing = this._factory.createThing(id, def, owner);
    this._set(thing.id, thing);
    this._eventSink.onThingAdded(thing);
    return thing;
  }

  deleteThing(thingId: string): void {
    const thing = this.get(thingId);
    if (thing) {
      this._delete(thingId);
      this._eventSink.onThingRemoved(thing);
    }
  }
}
