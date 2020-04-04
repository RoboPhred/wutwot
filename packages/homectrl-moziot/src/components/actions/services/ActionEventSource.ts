import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingAction } from "../types";

export const ActionEventSource: Identifier<ActionEventSource> = createSymbol(
  "ActionEventSource"
);
export interface ActionEventSource {
  on(
    event: "action.add",
    handler: (e: ThingActionAddedEventArgs) => void
  ): this;
  once(
    event: "action.add",
    handler: (e: ThingActionAddedEventArgs) => void
  ): this;

  on(
    event: "action.remove",
    handler: (e: ThingActionRemovedEventArgs) => void
  ): this;
  once(
    event: "action.remove",
    handler: (e: ThingActionRemovedEventArgs) => void
  ): this;

  removeListener(event: string, handler: Function): this;
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
