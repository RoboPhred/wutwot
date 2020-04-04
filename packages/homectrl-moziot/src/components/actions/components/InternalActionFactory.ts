import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionDef } from "../types";
import { InternalAction } from "../services";

export const InternalActionFactory: Identifier<InternalActionFactory> = createSymbol(
  "InternalActionFactory"
);
export interface InternalActionFactory {
  createAction(def: ThingActionDef, owner: object): InternalAction;
}
