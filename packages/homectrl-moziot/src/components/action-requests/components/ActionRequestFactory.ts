import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest, ThingActionRequestDef } from "../types";

export const ActionRequestFactory: Identifier<ActionRequestFactory> = createSymbol(
  "ActionRequestFactory"
);
export interface ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    def: ThingActionRequestDef
  ): ThingActionRequest;
}
