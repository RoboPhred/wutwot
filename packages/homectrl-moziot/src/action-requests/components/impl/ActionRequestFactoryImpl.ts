import { injectable, singleton, provides } from "microinject";
import uuidV4 from "uuid/v4";

import { ThingActionRequest, ThingActionRequestToken } from "../../types";

import { ActionRequestFactory } from "../ActionRequestFactory";

import { ThingActionRequestTokenImpl } from "./ThingActionRequestTokenImpl";
import { ThingActionRequestImpl } from "./ThingActionRequestImpl";

@injectable()
@singleton()
@provides(ActionRequestFactory)
export class ActionRequestFactoryImpl implements ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string
  ): { request: ThingActionRequest; token: ThingActionRequestToken } {
    const token = new ThingActionRequestTokenImpl(
      uuidV4(),
      thingId,
      actionId,
      input,
      timeRequested
    );
    const request = new ThingActionRequestImpl(token);

    return { token, request };
  }
}
