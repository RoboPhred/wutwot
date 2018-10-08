import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingAction } from "../types";

import { ActionRegistry } from "./ActionRegistry";

export const ActionRepository: Identifier<ActionRepository> = createSymbol(
  "ActionRepository"
);

export interface ActionRepository extends ActionRegistry {
  addAction(thingId: string, action: ThingAction): void;
  removeAction(thingId: string, actionId: string): void;
}
