import { injectable, inject } from "microinject";
import { MozIot, SchemaValidationError } from "homectrl-moziot";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";

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
@controller("/things/:thingId/actions/:actionId")
export class ThingActionById {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getActions(
    @param("thingId") thingId: string,
    @param("actionId") actionId: string
  ) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const action = getActionOrThrow(thing, actionId);
    return action.requests.map(request => ({
      [actionId]: this._restifier.actionRequestToRest(request)
    }));
  }

  @post()
  @status(HttpStatusCodes.CREATED)
  public postAction(
    @param("thingId") thingId: string,
    @param("actionId") actionId: string,
    @body() body: any
  ) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const bodyKeys = Object.keys(body);
    if (bodyKeys.length != 1 || bodyKeys[0] !== actionId) {
      throw createError(
        HttpStatusCodes.BAD_REQUEST,
        "One Action must be passed in the body."
      );
    }
    const input = body[actionId];
    const action = getActionOrThrow(thing, actionId);

    try {
      const request = action.request(input);
      return this._restifier.actionRequestToRest(request, false);
    } catch (e) {
      if (e instanceof SchemaValidationError) {
        throw createError(HttpStatusCodes.BAD_REQUEST, e.message);
      }
      throw e;
    }
  }
}
