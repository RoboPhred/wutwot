import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent } from "../types";

export const EventEventSource: Identifier<EventEventSource> = createSymbol(
  "EventEventSource"
);
export interface EventEventSource {
  on(event: "event.add", handler: ThingEventAddedEventHandler): this;
  once(event: "event.add", handler: ThingEventAddedEventHandler): this;
  removeListener(
    event: "event.add",
    handler: ThingEventAddedEventHandler
  ): this;

  on(event: "event.remove", handler: ThingEventRemovedEventHandler): this;
  once(event: "event.remove", handler: ThingEventRemovedEventHandler): this;
  removeListener(
    event: "event.remove",
    handler: ThingEventRemovedEventHandler
  ): this;
}

export type ThingEventAddedEventHandler = (e: ThingEventAddedEventArgs) => void;

export interface ThingEventAddedEventArgs {
  thingId: string;
  eventId: string;
  event: ThingEvent;
}

export type ThingEventRemovedEventHandler = (
  e: ThingEventRemovedEventArgs
) => void;

export interface ThingEventRemovedEventArgs {
  thingId: string;
  eventId: string;
  // TODO: Add ThingEvent, for removing event handlers.
}
