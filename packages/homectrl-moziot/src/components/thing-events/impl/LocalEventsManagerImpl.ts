import { injectable, provides, injectParam, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope } from "../../things";

import { ThingEvent, ThingEventDef, validateEventDefOrThrow } from "../types";
import { LocalEventsManager } from "../services/LocalEventsManager";
import { EventEventSink } from "../components/EventEventSink";

import { ThingEventImpl } from "./ThingEventImpl";
import { MozIotPlugin } from "../../plugin-management";

@injectable()
@inThingScope()
@provides(LocalEventsManager)
export class EventServiceImpl
  extends SelfPopulatingReadonlyMap<string, ThingEvent>
  implements LocalEventsManager {
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(EventEventSink)
    private _eventSink: EventEventSink,
  ) {
    super();
  }

  createEvent(def: ThingEventDef, owner: MozIotPlugin): ThingEvent {
    validateEventDefOrThrow(def);
    const id = `${owner.id}-${def.pluginLocalId}`;

    if (this.has(id)) {
      throw new Error(
        `Plugin-Local ID ${def.pluginLocalId} is already in use.`,
      );
    }

    const event = new ThingEventImpl(def, id, this._thingId, owner);
    this._set(id, event);
    this._eventSink.onEventAdded(event);

    return event;
  }
}
