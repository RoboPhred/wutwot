import { injectable, provides, injectParam } from "microinject";

import { LegacyIdMapper } from "../../../utils/LegacyIdMapper";

import { InternalThingParams, inThingScope } from "../../things";

import { ThingEvent, ThingEventDef, validateEventDefOrThrow } from "../types";

import { LocalEventsManager } from "../services/LocalEventsManager";

import { ThingEventImpl } from "./ThingEventImpl";

@injectable()
@inThingScope()
@provides(LocalEventsManager)
export class EventServiceImpl implements LocalEventsManager {
  private _idMapper = new LegacyIdMapper();
  private _eventsById = new Map<string, ThingEvent>();

  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
  ) {}

  getEvent(eventId: string): ThingEvent | undefined {
    return this._eventsById.get(eventId);
  }

  getAllEvents(): ThingEvent[] {
    return Array.from(this._eventsById.values());
  }

  addEvent(eventDef: ThingEventDef, owner: object): ThingEvent {
    validateEventDefOrThrow(eventDef);
    const id = this._idMapper.createId(eventDef.title);
    const event = new ThingEventImpl(eventDef, id, this._thingId, owner);
    this._eventsById.set(event.id, event);
    return event;
  }
}
