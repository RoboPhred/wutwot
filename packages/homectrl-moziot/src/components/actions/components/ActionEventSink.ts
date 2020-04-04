import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingAction } from "../types";

export const ActionEventSink: Identifier<ActionEventSink> = createSymbol(
  "ActionEventSink"
);
export interface ActionEventSink {
  onActionAdded(thingId: string, actionId: string, action: ThingAction): void;
  onActionRemoved(thingId: string, actionId: string): void;
}
