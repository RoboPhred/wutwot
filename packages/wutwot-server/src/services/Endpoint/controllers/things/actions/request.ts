import { inject, injectable } from "microinject";
import { MozIot } from "@wutwot/core";

import { controller, get, param } from "../../../infrastructure";
import {
  getThingOrThrow,
  getActionOrThrow,
  getRequestOrThrow,
} from "../../../controller-utils";
import { Restifier } from "../../../Restifier";

@injectable()
@controller("/things/:thingId/actions/:actionId/:requestId")
export class ThingActionRequest {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  getRequest(
    @param("thingId") thingId: string,
    @param("actionId") actionId: string,
    @param("requestId") requestId: string,
  ) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const action = getActionOrThrow(thing, actionId);
    const request = getRequestOrThrow(action, requestId);
    return {
      [actionId]: this._restifier.actionRequestToRest(request),
    };
  }

  // TODO: DELETE request
}
