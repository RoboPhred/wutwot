import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty } from "../types";

/**
 * Identifies a PropertyEventSource service.
 *
 * The PropertyEventSource service provides events pertaining to any {@link ThingProperty}.
 */
export const PropertyEventSource: Identifier<PropertyEventSource> = createSymbol(
  "PropertyEventSource",
);

/**
 * Defines the PropertyEventSource service.
 *
 * The PropertyEventSource service provides events pertaining to any {@link ThingProperty}.
 */
export interface PropertyEventSource {
  /**
   * Attach a handler to handle when a {@link ThingProperty} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "property.add", handler: ThingPropertyAddedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link ThingProperty} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "property.add", handler: ThingPropertyAddedEventHandler): this;

  /**
   * Removes a handler for `property.add`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "property.add",
    handler: ThingPropertyAddedEventHandler,
  ): this;

  /**
   * Attach a handler to handle when a {@link ThingProperty} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "property.remove", handler: ThingPropertyRemovedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link ThingProperty} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(
    event: "property.remove",
    handler: ThingPropertyRemovedEventHandler,
  ): this;

  /**
   * Removes a handler for `property.remove`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "property.remove",
    handler: ThingPropertyRemovedEventHandler,
  ): this;
}

/**
 * Defines an event handler for a `property.add` event.
 */
export type ThingPropertyAddedEventHandler = (
  e: ThingPropertyAddedEventArgs,
) => void;

/**
 * Defines the event arguments passed to a `property.add` event.
 */
export interface ThingPropertyAddedEventArgs {
  /**
   * The ID of the thing the property was added to.
   */
  thingId: string;

  /**
   * The ID of the added property.
   */
  propertyId: string;

  /**
   * The added property.
   */
  property: ThingProperty;
}

/**
 * Defines an event handler for a `property.remove` event.
 */
export type ThingPropertyRemovedEventHandler = (
  e: ThingPropertyRemovedEventArgs,
) => void;

/**
 * Defines the event arguments passed to a `property.remove` event.
 */
export interface ThingPropertyRemovedEventArgs {
  /**
   * The ID of the thing the property was removed from.
   */
  thingId: string;

  /**
   * The ID of the removed property.
   */
  propertyId: string;

  /**
   * The removed property
   */
  property: ThingProperty;
}
