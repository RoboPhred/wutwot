import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest } from "../types";

/**
 * Identifies the ActionRequestEventSink service.
 *
 * This service should be used to announce events pertaining to {@link ThingActionRequest}s.
 */
export const ActionRequestEventSink: Identifier<ActionRequestEventSink> = createSymbol(
  "ActionRequestEventSink",
);

/**
 * This service should be used to announce events pertaining to {@link ThingActionRequest}s.
 */
export interface ActionRequestEventSink {
  /**
   * Announce the creation of a new {@link ThingActionRequest}
   * @param actionRequest The newly added {@link ThingActionRequest}
   */
  onActionRequestAdded(actionRequest: ThingActionRequest): void;

  // TODO: onActionRequestUpdated, to be called when status changes.

  // TODO: onActionRequestRemoved.  It's a bit silly to remove a request, but we do support
  //  removing things, which removes actions, which removes our request container.
  // We previously did not have this event as action requests previously remained behind
  //  after the thing was removed.  This is no longer the case with the new design.
}
