import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingActionDef, ThingActionInvocation } from "./types";

export const ActionSource: Identifier<ActionSource> = createSymbol(
  "ActionSource"
);
export interface ActionSource {
  readonly id: string;

  getActions(thingId: string): ReadonlyArray<ThingActionDef>;

  invokeAction(
    thingId: string,
    actionId: string,
    input: any
  ): ThingActionInvocation;

  cancelAction(actionId: string): boolean;

  invocations: ReadonlyArray<ThingActionInvocation>;

  on(event: "action.add", handler: (e: ActionEventArgs) => void): void;

  on(event: "action.remove", handler: (e: ActionEventArgs) => void): void;

  on(event: "action.start", handler: (e: ActionStartEventArgs) => void): void;

  on(event: "action.end", handler: (e: ActionEndEventArgs) => void): void;
}

export interface ActionEventArgs {
  readonly thingId: string;
  readonly action: ThingActionDef;
}

export interface ActionStartEventArgs extends ActionEventArgs {
  readonly invocation: ThingActionInvocation;
}

export interface ActionEndEventArgs extends ActionEventArgs {
  readonly invocation: ThingActionInvocation;
  readonly canceled: boolean;
}
