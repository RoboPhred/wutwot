import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";
import { ActionSource, ThingActionDef } from "../../contracts/ActionSource";

export const ActionAggregator: Identifier<ActionSource> = createSymbol(
  "ActionAggregator"
);
export interface ActionAggregator {
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
