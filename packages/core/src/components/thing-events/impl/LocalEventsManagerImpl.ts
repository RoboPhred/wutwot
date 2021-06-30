import { injectable, provides, injectParam, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope, ThingsManager } from "../../things";
import { WutWotPlugin } from "../../plugin-management";
import { DuplicateIDError, makeCompoundId } from "../../id-mapping";

import { ThingEvent, ThingEventDef, validateEventDefOrThrow } from "../types";
import { LocalEventsManager } from "../services";
import { EventEventSink } from "../components";

import { ThingEventImpl } from "./ThingEventImpl";
import { FormProvider } from "../../properties";

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
    @inject(ThingsManager)
    private _thingsManager: ThingsManager,
    @inject(FormProvider, { all: true, optional: true })
    private _formProviders: FormProvider[] = [],
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

    const thing = this._thingsManager.get(this._thingId);
    if (!thing) {
      throw new Error(
        "Tried to create an action for a Thing that is not yet registered.",
      );
    }

    // TODO: Use factory or parameterized construction.

    const event = new ThingEventImpl(
      def,
      id,
      thing,
      owner,
      this._eventSink,
      this._formProviders,
    );
    this._set(id, event);
    this._eventSink.onEventAdded(event);

    return event;
  }
}
