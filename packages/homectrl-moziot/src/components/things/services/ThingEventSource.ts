import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";

/**
 * Identifies a ThingEventSource service.
 *
 * The ThingEventSource service provides events pertaining to any {@link Thing}.
 */
export const ThingEventSource: Identifier<ThingEventSource> = createSymbol(
  "ThingEventSource"
);

/**
 * Defines the ThingEventSource service.
 *
 * The ThingEventSource service provides events pertaining to any {@link Thing}.
 */
export interface ThingEventSource {
  /**
   * Attach a handler to handle when a {@link Thing} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "thing.add", handler: ThingAddedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link Thing} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "thing.add", handler: ThingAddedEventHandler): this;

  /**
   * Removes a handler for `thing.add`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(event: "thing.add", handler: ThingAddedEventHandler): this;

  /**
   * Attach a handler to handle when a {@link Thing} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "thing.remove", handler: ThingRemovedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link Thing} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "thing.remove", handler: ThingRemovedEventHandler): this;

  /**
   * Removes a handler for `thing.remove`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "thing.remove",
    handler: ThingRemovedEventHandler
  ): this;
}

/**
 * Defines an event handler for a `thing.add` event.
 */
export type ThingAddedEventHandler = (e: ThingAddedEventArgs) => void;

/**
 * Defines the event arguments passed to a `thing.add` event.
 */
export interface ThingAddedEventArgs {
  /**
   * The ID of the thing being added.
   */
  thingId: string;

  /**
   * The thing being added.
   */
  thing: Thing;
}

/**
 * Defines an event handler for a `thing.remove` event.
 */
export type ThingRemovedEventHandler = (e: ThingRemovedEventArgs) => void;

/**
 * Defines the event arguments passed to a `thing.remove` event.
 */
export interface ThingRemovedEventArgs {
  /**
   * The ID of the thing being removed.
   */
  thingId: string;

  /**
   * The thing being removed.
   */
  thing: Thing;
}
