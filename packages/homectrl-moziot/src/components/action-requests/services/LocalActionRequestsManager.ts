import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest, ThingActionRequestDef } from "../types";

/**
 * Identifies the LocalActionRequestsManager service
 *
 * This is a service scoped to an action, that manages the action requests
 * for its parent action.
 */
export const LocalActionRequestsManager: Identifier<LocalActionRequestsManager> = createSymbol(
  "ActionRequestService"
);

/**
 * Defines a service capable of managing action requests for a parent action.
 */
export interface LocalActionRequestsManager {
  getAllRequests(): ThingActionRequest[];
  addRequest(def: ThingActionRequestDef): ThingActionRequest;
}
