import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent } from "../types";

import { EventRegistry } from "./EventRegistry";

export const EventRepository: Identifier<EventRepository> = createSymbol(
  "EventRepository"
);

export interface EventRepository extends EventRegistry {
  addEvent(thingId: string, event: ThingEvent): void;
  removeEvent(thingId: string, eventId: string): void;
  removeAllThingEvents(thingId: string): void;
}
