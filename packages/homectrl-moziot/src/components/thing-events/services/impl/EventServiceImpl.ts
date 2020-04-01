import { injectable, singleton, provides, inject } from "microinject";

import { ThingEventSource, ThingRemovedEventArgs } from "../../../things";

import { ThingEvent, ThingEventDef } from "../../types";
import { EventRepository } from "../../components/EventRepository";
import { EventFactory } from "../../components/EventFactory";

import { EventService } from "../EventService";

@injectable()
@provides(EventService)
@singleton()
export class EventServiceImpl implements EventService {
  constructor(
    @inject(EventFactory) private _eventFactory: EventFactory,
    @inject(EventRepository) private _eventRepository: EventRepository,
    @inject(ThingEventSource) thingEventSource: ThingEventSource
  ) {
    thingEventSource.on("thing.remove", this._onThingRemoved.bind(this));
  }

  getEvent(thingId: string, eventId: string): ThingEvent | undefined {
    return this._eventRepository.get(thingId, eventId);
  }

  getForThing(thingId: string): ThingEvent[] {
    return this._eventRepository.getForThing(thingId);
  }

  addEvent(
    thingId: string,
    eventDef: ThingEventDef,
    owner: object
  ): ThingEvent {
    const event = this._eventFactory.createEvent(eventDef, thingId, owner);
    this._eventRepository.addEvent(thingId, event);

    return event;
  }

  private _onThingRemoved(e: ThingRemovedEventArgs) {
    this._eventRepository.removeAllThingEvents(e.thingId);
  }
}
