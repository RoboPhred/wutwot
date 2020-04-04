import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest } from "../types";

export const ActionRequestEventSource: Identifier<ActionRequestEventSource> = createSymbol(
  "ActionRequestEventSource"
);
export interface ActionRequestEventSource {
  on(
    event: "actionRequest.add",
    handler: (e: ThingActionRequestAddedEventArgs) => void
  ): this;
  once(
    event: "actionRequest.add",
    handler: (e: ThingActionRequestAddedEventArgs) => void
  ): this;

  removeListener(event: string, handler: Function): this;
}

export interface ThingActionRequestAddedEventArgs {
  thingId: string;
  actionId: string;
  actionRequestId: string;
  actionRequest: ThingActionRequest;
}
