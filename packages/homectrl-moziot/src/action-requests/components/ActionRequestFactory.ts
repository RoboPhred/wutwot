import { Identifier } from "microinject";
import { Observable } from "rxjs";

import createSymbol from "../../create-symbol";

import { ThingActionRequest, ThingActionRequestStatus } from "../types";

export const ActionRequestFactory: Identifier<
  ActionRequestFactory
> = createSymbol("ActionRequestFactory");
export interface ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string,
    status: Observable<ThingActionRequestStatus>
  ): ThingActionRequest;
}
