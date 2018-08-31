import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingActionRequest, ThingActionRequestToken } from "../types";

export const ActionRequestFactory: Identifier<
  ActionRequestFactory
> = createSymbol("ActionRequestFactory");
export interface ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string
  ): { request: ThingActionRequest; token: ThingActionRequestToken };
}
