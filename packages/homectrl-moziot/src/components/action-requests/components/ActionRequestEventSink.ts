import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest } from "../types";

export const ActionRequestEventSink: Identifier<ActionRequestEventSink> = createSymbol(
  "ActionRequestEventSink"
);
export interface ActionRequestEventSink {
  onActionRequestAdded(actionRequest: ThingActionRequest): void;
}
