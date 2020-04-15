import { injectable, inject } from "microinject";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import { flatMap } from "lodash";
import { WutWot } from "@wutwot/core";

import { Restifier } from "../../../Restifier";
import {
  controller,
  get,
  param,
  post,
  status,
  body,
} from "../../../infrastructure";
import { getThingOrThrow, getActionOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/actions")
export class ThingActionsRoot {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  getActionRequests(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._wutwot, thingId);

    const requests = flatMap(
      Array.from(thing.actions.values()),
      (action) => action.requests,
    );
    // TODO: Sort requests.  Newer / pending actions should be before completed / older
    return requests;
  }

  @post()
  @status(HttpStatusCodes.CREATED)
  postAction(@param("thingId") thingId: string, @body() body: any) {
    const thing = getThingOrThrow(this._wutwot, thingId);
    const bodyKeys = Object.keys(body);
    if (bodyKeys.length != 1) {
      throw createError(
        HttpStatusCodes.BAD_REQUEST,
        "One Action must be passed in the body.",
      );
    }
    const actionName = bodyKeys[0];
    const input = body[actionName];
    const action = getActionOrThrow(
      thing,
      actionName,
      HttpStatusCodes.BAD_REQUEST,
    );
    const request = action.invoke(input);
    return this._restifier.actionRequestToRest(request, false);
  }
}
