import { injectable, provides, injectParam, inject } from "microinject";

import { LegacyIdMapper } from "../../../utils/LegacyIdMapper";
import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope } from "../../things";

import { ThingEvent, ThingEventDef, validateEventDefOrThrow } from "../types";
import { LocalEventsManager } from "../services/LocalEventsManager";
import { EventEventSink } from "../components/EventEventSink";

import { ThingEventImpl } from "./ThingEventImpl";

@injectable()
@inThingScope()
@provides(LocalEventsManager)
export class EventServiceImpl
  extends SelfPopulatingReadonlyMap<string, ThingEvent>
  implements LocalEventsManager {
  private _idMapper = new LegacyIdMapper();

  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(EventEventSink)
    private _eventSink: EventEventSink,
  ) {
    super();
  }

  createEvent(eventDef: ThingEventDef, owner: object): ThingEvent {
    validateEventDefOrThrow(eventDef);
    const id = this._idMapper.createId(eventDef.pluginLocalId);
    const event = new ThingEventImpl(eventDef, id, this._thingId, owner);
    this._set(id, event);
    this._eventSink.onEventAdded(event);
    return event;
  }
}
