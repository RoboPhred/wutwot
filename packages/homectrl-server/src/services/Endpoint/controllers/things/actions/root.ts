import { injectable, inject } from "microinject";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import { mapValues } from "lodash";

import { MozIot } from "../../../../MozIot";

import { Restifier } from "../../../Restifier";
import {
  controller,
  get,
  param,
  post,
  status,
  body
} from "../../../infrastructure";
import { getThingOrThrow, getActionOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/actions")
export class ThingActionsRoot {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getActions(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    return mapValues(thing.actions, x => this._restifier.actionToRest(x));
  }

  @post()
  @status(HttpStatusCodes.CREATED)
  public postAction(@param("thingId") thingId: string, @body() body: any) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const bodyKeys = Object.keys(body);
    if (bodyKeys.length != 1) {
      throw createError(
        HttpStatusCodes.BAD_REQUEST,
        "One Action must be passed in the body."
      );
    }
    const actionName = bodyKeys[0];
    const input = body[actionName];
    const action = getActionOrThrow(
      thing,
      actionName,
      HttpStatusCodes.BAD_REQUEST
    );
    const request = action.request(input);
    return this._restifier.actionRequestToRest(request, false);
  }
}
