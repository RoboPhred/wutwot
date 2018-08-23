import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingActionContext } from "../contracts";

export const ActionRepository: Identifier<ActionRepository> = createSymbol(
  "ActionRepository"
);

export interface ActionRepository {
  addAction(action: ThingActionContext): void;
  removeAction(thingId: string, actionId: string): void;
}
