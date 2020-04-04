import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest, ThingActionRequestDef } from "../types";

export const LocalActionRequestsManager: Identifier<LocalActionRequestsManager> = createSymbol(
  "ActionRequestService"
);
export interface LocalActionRequestsManager {
  getAllRequests(): ThingActionRequest[];
  addRequest(def: ThingActionRequestDef): ThingActionRequest;
}
