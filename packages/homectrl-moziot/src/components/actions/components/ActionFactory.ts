import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionDef, ThingAction } from "../types";

export const ActionFactory: Identifier<ActionFactory> = createSymbol(
  "ActionFactory"
);
export interface ActionFactory {
  createAction(
    action: ThingActionDef,
    thingId: string,
    owner: object
  ): ThingAction;
}
