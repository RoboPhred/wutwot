import { injectable, singleton, provides, inject } from "microinject";

import { ThingEvent } from "../../types";

import { EventRegistry } from "../EventRegistry";
import { EventRepository } from "../EventRepository";
import { EventEventSink } from "../EventEventSink";

@injectable()
@singleton()
@provides(EventRegistry)
@provides(EventRepository)
export class EventRepositoryImpl implements EventRepository {
  private _eventsByThingId = new Map<string, ThingEvent[]>();

  constructor(
    @inject(EventEventSink) private _eventEventSink: EventEventSink
  ) {}

  addEvent(thingId: string, event: ThingEvent): void {
    let events = this._eventsByThingId.get(thingId);
    if (!events) {
      events = [];
      this._eventsByThingId.set(thingId, events);
    }

    if (events.find(x => x.id === event.id)) {
      throw new Error("Duplicate event id.");
    }

    events.push(event);
    this._eventEventSink.onEventAdded(thingId, event.id, event);
  }

  removeEvent(thingId: string, eventId: string): void {
    const events = this._eventsByThingId.get(thingId) || [];
    const idx = events.findIndex(x => x.id === eventId);
    if (idx !== -1) {
      events.splice(idx, 1);
      this._eventEventSink.onEventRemoved(thingId, eventId);
    }
  }

  removeAllThingEvents(thingId: string): void {
    this._eventsByThingId.delete(thingId);
  }

  get(thingId: string, eventId: string): ThingEvent | undefined {
    const events = this._eventsByThingId.get(thingId) || [];
    return events.find(x => x.id === eventId);
  }

  getForThing(thingId: string): ThingEvent[] {
    const events = this._eventsByThingId.get(thingId) || [];
    return [...events];
  }
}
