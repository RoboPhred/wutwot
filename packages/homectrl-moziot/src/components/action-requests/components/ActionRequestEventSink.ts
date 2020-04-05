import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest } from "../types";

/**
 * Identifies the ActionRequestEventSink service.
 *
 * This service should be used to announce events pertaining to action requests.
 */
export const ActionRequestEventSink: Identifier<ActionRequestEventSink> = createSymbol(
  "ActionRequestEventSink"
);

/**
 * Defines a service to be notified of events regarding action requests.
 */
export interface ActionRequestEventSink {
  onActionRequestAdded(actionRequest: ThingActionRequest): void;
}
