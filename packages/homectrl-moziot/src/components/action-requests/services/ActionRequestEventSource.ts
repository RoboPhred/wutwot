import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest } from "../types";

/**
 * Identifies the ActionRequestEventSource service.
 *
 * This service can be used to receive events pertaining to any {@link ThingActionRequest}.
 */
export const ActionRequestEventSource: Identifier<ActionRequestEventSource> = createSymbol(
  "ActionRequestEventSource"
);

/**
 * A source of events for action requests.
 *
 * This event emitter will emit events for all action requests,
 * regardless of parent action or thing.
 */
export interface ActionRequestEventSource {
  /**
   * Attach a handler to handle when a {@link ThingActionRequest} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  on(
    event: "actionRequest.add",
    handler: ThingActionRequestAddedEventHandler
  ): this;

  /**
   * Attach a handler to be raised the next time a {@link ThingActionRequest} is added.
   * @param event The event to handle.
   * @param handler The function to call when the event is raised.
   */
  once(
    event: "actionRequest.add",
    handler: ThingActionRequestAddedEventHandler
  ): this;

  /**
   * Removes a handler for `actionRequest.add`.
   * @param event The event to remove a handler for.
   * @param handler The handler to remove.
   */
  removeListener(
    event: "actionRequest.add",
    handler: ThingActionRequestAddedEventHandler
  ): this;
}

/**
 * Describes an event handler for a `actionRequest.add` event.
 */
export type ThingActionRequestAddedEventHandler = (
  e: ThingActionRequestAddedEventArgs
) => void;

/**
 * Event data for an "actionRequest.add" event.
 */
export interface ThingActionRequestAddedEventArgs {
  /**
   * The Thing ID of the thing the request was added to.
   */
  thingId: string;

  /**
   * The Action ID of the action the request was added to.
   */
  actionId: string;

  /**
   * The Action Request ID of the newly created request.
   */
  actionRequestId: string;

  /**
   * The newly created request.
   */
  actionRequest: ThingActionRequest;
}
