import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent } from "../types";

/**
 * Identifies a EventEventSource service.
 *
 * The EventEventSource service provides events pertaining to any {@link ThingEvent}.
 */
export const EventEventSource: Identifier<EventEventSource> = createSymbol(
  "EventEventSource"
);

/**
 * Defines the EventEventSource service.
 *
 * The EventEventSource service provides events pertaining to any {@link ThingEvent}.
 */
export interface EventEventSource {
  /**
   * Attach a handler to handle when a {@link ThingEvent} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "event.add", handler: ThingEventAddedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link ThingEvent} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "event.add", handler: ThingEventAddedEventHandler): this;

  /**
   * Removes a handler for `event.add`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "event.add",
    handler: ThingEventAddedEventHandler
  ): this;

  /**
   * Attach a handler to handle when a {@link ThingEvent} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "event.remove", handler: ThingEventRemovedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link ThingEvent} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "event.remove", handler: ThingEventRemovedEventHandler): this;

  /**
   * Removes a handler for `event.remove`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "event.remove",
    handler: ThingEventRemovedEventHandler
  ): this;
}

/**
 * Defines an event handler for an `event.add` event.
 */
export type ThingEventAddedEventHandler = (e: ThingEventAddedEventArgs) => void;

/**
 * Defines the event arguments passed to an `event.add` event.
 */
export interface ThingEventAddedEventArgs {
  /**
   * The ID of the thing the event was added to.
   */
  thingId: string;

  /**
   * The ID of the added event.
   */
  eventId: string;

  /**
   * The added event.
   */
  event: ThingEvent;
}

/**
 * Defines an event handler for an `event.remove` event.
 */
export type ThingEventRemovedEventHandler = (
  e: ThingEventRemovedEventArgs
) => void;

/**
 * Defines the event arguments passed to an `event.remove` event.
 */
export interface ThingEventRemovedEventArgs {
  /**
   * The ID of the thing the event was removed from.
   */
  thingId: string;

  /**
   * The ID of the removed event.
   */
  eventId: string;

  /**
   * The removed event
   */
  event: ThingEvent;
}
