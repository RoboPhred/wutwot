import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent, ThingEventDef } from "../types";

export const EventService: Identifier<EventService> = createSymbol(
  "EventService"
);
export interface EventService {
  getEvent(thingId: string, eventId: string): ThingEvent | undefined;
  getForThing(thingId: string): ThingEvent[];

  addEvent(thingId: string, eventDef: ThingEventDef, owner: object): ThingEvent;
}
