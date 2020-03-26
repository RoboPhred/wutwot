import { injectable, singleton, provides } from "microinject";
import uuidV4 from "uuid/v4";

import { ThingActionRequest, ThingActionRequestDef } from "../../types";

import { ActionRequestFactory } from "../ActionRequestFactory";

import { ThingActionRequestImpl } from "./ThingActionRequestImpl";

@injectable()
@singleton()
@provides(ActionRequestFactory)
export class ActionRequestFactoryImpl implements ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    def: ThingActionRequestDef
  ): ThingActionRequest {
    const id = uuidV4();
    const request = new ThingActionRequestImpl(id, thingId, actionId, def);
    return request;
  }
}
