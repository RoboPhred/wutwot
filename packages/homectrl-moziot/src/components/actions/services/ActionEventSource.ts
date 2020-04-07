import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingAction } from "../types";

/**
 * Identifies an ActionEventSource service.
 *
 * The ActionEventSource service provides events pertaining to any {@link ThingAction}.
 */
export const ActionEventSource: Identifier<ActionEventSource> = createSymbol(
  "ActionEventSource",
);

/**
 * Defines the ActionEventSource service.
 *
 * The ActionEventSource service provides events pertaining to any {@link ThingAction}.
 */
export interface ActionEventSource {
  /**
   * Attach a handler to handle when a {@link ThingAction} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "action.add", handler: ThingActionAddedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link ThingAction} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "action.add", handler: ThingActionAddedEventHandler): this;

  /**
   * Removes a handler for `action.add`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "action.add",
    handler: ThingActionAddedEventHandler,
  ): this;

  /**
   * Attach a handler to handle when a {@link ThingAction} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(event: "action.remove", handler: ThingActionRemovedEventHandler): this;

  /**
   * Attach a handler to handle the next time a {@link ThingAction} is removed.
   * @param event The event to handle.
   * @param handler The function to call when the event is next raised.
   */
  once(event: "action.remove", handler: ThingActionRemovedEventHandler): this;

  /**
   * Removes a handler for `action.remove`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "action.remove",
    handler: ThingActionRemovedEventHandler,
  ): this;
}

/**
 * Defines an event handler for an `action.add` event.
 */
export type ThingActionAddedEventHandler = (
  e: ThingActionAddedEventArgs,
) => void;

/**
 * Defines the event arguments passed to an `action.add` event.
 */
export interface ThingActionAddedEventArgs {
  /**
   * The ID of the thing the action was added to.
   */
  thingId: string;

  /**
   * The ID of the newly added action.
   */
  actionId: string;

  /**
   * The action that was added.
   */
  action: ThingAction;
}

/**
 * Defines an event handler for an `action.remove` event.
 */
export type ThingActionRemovedEventHandler = (
  e: ThingActionRemovedEventArgs,
) => void;

/**
 * Defines the event arguments passed to an `action.remove` event.
 */
export interface ThingActionRemovedEventArgs {
  /**
   * The ID of the thing the action was removed from.
   */
  thingId: string;

  /**
   * The ID of the action that was removed.
   */
  actionId: string;

  /**
   * The action being removed.
   */
  action: ThingAction;
}
