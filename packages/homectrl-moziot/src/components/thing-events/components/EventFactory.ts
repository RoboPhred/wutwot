import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEventDef, ThingEvent } from "../types";

export const EventFactory: Identifier<EventFactory> = createSymbol(
  "EventFactory"
);
export interface EventFactory {
  createEvent(
    eventDef: ThingEventDef,
    thingId: string,
    owner: object
  ): ThingEvent;
}
