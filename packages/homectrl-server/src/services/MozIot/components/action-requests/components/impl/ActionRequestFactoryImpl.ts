import { injectable, singleton, provides } from "microinject";
import uuidV4 from "uuid/v4";
import { Observable } from "rxjs";

import { ThingActionRequest, ThingActionRequestStatus } from "../../types";

import { ActionRequestFactory } from "../ActionRequestFactory";

import { ThingActionRequestImpl } from "./ThingActionRequestImpl";

@injectable()
@singleton()
@provides(ActionRequestFactory)
export class ActionRequestFactoryImpl implements ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string,
    status: Observable<ThingActionRequestStatus>
  ): ThingActionRequest {
    const id = uuidV4();
    const request = new ThingActionRequestImpl(
      id,
      thingId,
      actionId,
      input,
      timeRequested,
      status
    );
    return request;
  }
}
