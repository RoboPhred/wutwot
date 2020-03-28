import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest, ThingActionRequestDef } from "../types";

export const ActionRequestService: Identifier<ActionRequestService> = createSymbol(
  "ActionRequestService"
);
export interface ActionRequestService {
  addRequest(
    thingId: string,
    actionId: string,
    def: ThingActionRequestDef
  ): ThingActionRequest;
}
