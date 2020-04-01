import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent } from "../types";

export const EventEventSource: Identifier<EventEventSource> = createSymbol(
  "EventEventSource"
);
export interface EventEventSource {
  on(event: "event.add", handler: (e: ThingEventAddedEventArgs) => void): this;
  on(
    event: "event.remove",
    handler: (e: ThingEventRemovedEventArgs) => void
  ): this;
  removeListener(event: string, handler: Function): this;
}

export interface ThingEventAddedEventArgs {
  thingId: string;
  eventId: string;
  event: ThingEvent;
}

export interface ThingEventRemovedEventArgs {
  thingId: string;
  eventId: string;
}
