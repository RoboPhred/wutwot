import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionDef } from "../types";

import { InternalAction } from "./InternalAction";

export const LocalActionsManager: Identifier<LocalActionsManager> = createSymbol(
  "ActionService"
);
export interface LocalActionsManager {
  getAction(actionId: string): InternalAction | undefined;
  getAllActions(): InternalAction[];

  addAction(action: ThingActionDef, owner: object): InternalAction;
}
