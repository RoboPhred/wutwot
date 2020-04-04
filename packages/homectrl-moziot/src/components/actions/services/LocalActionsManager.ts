import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingAction, ThingActionDef } from "../types";

export const LocalActionsManager: Identifier<LocalActionsManager> = createSymbol(
  "ActionService"
);
export interface LocalActionsManager {
  getAction(actionId: string): ThingAction | undefined;
  getAllActions(): ThingAction[];

  addAction(action: ThingActionDef, owner: object): ThingAction;
}
