import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingAction, ThingActionDef } from "../types";

export const ActionService: Identifier<ActionService> = createSymbol(
  "ActionService"
);
export interface ActionService {
  getAction(thingId: string, actionId: string): ThingAction | undefined;
  addAction(
    thingId: string,
    action: ThingActionDef,
    owner: object
  ): ThingAction;
}
