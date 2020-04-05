import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingAction } from "../types";

/**
 * Identifies the ActionRequestEventSink service.
 *
 * This service should be used to announce events pertaining to {@link ThingAction}s.
 */
export const ActionEventSink: Identifier<ActionEventSink> = createSymbol(
  "ActionEventSink"
);

/**
 * Defines the ActionRequestEventSink service.
 *
 * This service should be used to announce events pertaining to {@link ThingAction}s.
 */
export interface ActionEventSink {
  /**
   * Announce the addition of a new {@link ThingAction}
   * @param action The newly added {@link ThingAction}
   */
  onActionAdded(action: ThingAction): void;

  /**
   * Announce the removal of a previously added {@link ThingAction}
   * @param thingId The ID of the thing the action was removed from.
   * @param actionId The ID of the action being removed.
   */
  // TODO: This is not called when a thing is destroyed.
  // TODO: This should include the action.
  //  We want action to have its own events for requests eventually,
  //  so we should pass the action on removal so consumers can removeListener
  onActionRemoved(thingId: string, actionId: string): void;
}
