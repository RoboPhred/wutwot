import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingAction } from "../types";

export const ActionRegistry: Identifier<ActionRegistry> = createSymbol(
  "ActionRegistry"
);
export interface ActionRegistry {
  get(thingId: string, actionId: string): ThingAction | undefined;

  getForThing(thingId: string): ThingAction[];

  on(
    event: "action.add",
    handler: (e: ThingActionAddedEventArgs) => void
  ): this;
  on(
    event: "action.remove",
    handler: (e: ThingActionRemovedEventArgs) => void
  ): this;
}

export interface ThingActionAddedEventArgs {
  thingId: string;
  actionId: string;
  action: ThingAction;
}

export interface ThingActionRemovedEventArgs {
  thingId: string;
  actionId: string;
}
