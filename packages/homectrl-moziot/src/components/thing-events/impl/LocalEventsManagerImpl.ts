import { injectable, provides, injectParam, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope } from "../../things";
import { MozIotPlugin } from "../../plugin-management";

import { ThingEvent, ThingEventDef, validateEventDefOrThrow } from "../types";
import { LocalEventsManager } from "../services";
import { EventEventSink } from "../components";

import { ThingEventImpl } from "./ThingEventImpl";

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
