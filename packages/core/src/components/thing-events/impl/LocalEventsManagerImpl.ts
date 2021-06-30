import { injectable, provides, injectParam, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope } from "../../things";
import { WutWotPlugin } from "../../plugin-management";
import { DuplicateIDError, makeCompoundId } from "../../id-mapping";

import { ThingEvent, ThingEventDef, validateEventDefOrThrow } from "../types";
import { LocalEventsManager } from "../services";
import { EventEventSink } from "../components";

import { ThingEventImpl } from "./ThingEventImpl";

@injectable()
@inThingScope()
@provides(LocalEventsManager)
export class EventServiceImpl
  extends SelfPopulatingReadonlyMap<string, ThingEvent>
  implements LocalEventsManager
{
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(EventEventSink)
    private _eventSink: EventEventSink,
  ) {
    super("EventsManager");
  }

  createEvent(def: ThingEventDef, owner: WutWotPlugin): ThingEvent {
    validateEventDefOrThrow(def);

    const id = makeCompoundId(owner.id, def.pluginLocalId);
    if (this.has(id)) {
      throw new DuplicateIDError(
        `Plugin ${owner.id} has already registered an event with a plugin-local id of "${def.pluginLocalId}".`,
      );
    }

    const event = new ThingEventImpl(
      def,
      id,
      this._thingId,
      owner,
      this._eventSink,
    );
    this._set(id, event);
    this._eventSink.onEventAdded(event);

    return event;
  }
}
