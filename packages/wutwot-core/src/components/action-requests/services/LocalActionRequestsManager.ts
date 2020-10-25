import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest, ThingActionRequestDef } from "../types";

/**
 * Identifies the LocalActionRequestsManager service
 *
 * This service manages the action requests for its parent action.
 * This service should be scoped to {@link ActionScope}
 */
export const LocalActionRequestsManager: Identifier<LocalActionRequestsManager> = createSymbol(
  "LocalActionRequestsManager",
);

/**
 * Defines the LocalActionRequestsManager service.
 *
 * This service manages the action requests for its parent action.
 */
export interface LocalActionRequestsManager {
  getAllRequests(): ThingActionRequest[];
  addRequest(def: ThingActionRequestDef): ThingActionRequest;
}
