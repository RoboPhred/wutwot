import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingActionRequestToken } from "../types";

export const ActionRequestService: Identifier<
  ActionRequestService
> = createSymbol("ActionRequestService");
export interface ActionRequestService {
  addRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string
  ): ThingActionRequestToken;
}
