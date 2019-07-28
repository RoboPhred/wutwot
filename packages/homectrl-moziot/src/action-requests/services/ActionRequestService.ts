import { Identifier } from "microinject";
import { Observable } from "rxjs";

import createSymbol from "../../create-symbol";

import { ThingActionRequestStatus, ThingActionRequest } from "../types";

export const ActionRequestService: Identifier<
  ActionRequestService
> = createSymbol("ActionRequestService");
export interface ActionRequestService {
  addRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string,
    status: Observable<ThingActionRequestStatus>
  ): ThingActionRequest;
}
