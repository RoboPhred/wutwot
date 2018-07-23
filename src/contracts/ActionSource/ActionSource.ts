import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingActionDef } from "./types";

export const ActionSource: Identifier<ActionSource> = createSymbol(
  "ActionSource"
);
export interface ActionSource {
  readonly id: string;

  getActions(thingId: string): ReadonlyArray<ThingActionDef>;

  on(
    event: "action.add",
    handler: (e: { thingId: string; action: ThingActionDef }) => void
  ): void;

  on(
    event: "action.remove",
    handler: (e: { thingId: string; action: ThingActionDef }) => void
  ): void;
}
