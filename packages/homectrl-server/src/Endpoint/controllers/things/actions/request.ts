import { controller, get, param } from "../../../infrastructure";
import {
  getThingOrThrow,
  getActionOrThrow,
  getRequestOrThrow
} from "../../../controller-utils";
import { inject } from "microinject";
import { MozIot } from "homectrl-moziot";
import { Restifier } from "../../../restifier";

@controller("/things/:thingId/actions/:actionId/:requestId")
export class ThingActionRequest {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getRequest(
    @param("thingId") thingId: string,
    @param("actionId") actionId: string,
    @param("requestId") requestId: string
  ) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const action = getActionOrThrow(thing, actionId);
    const request = getRequestOrThrow(action, requestId);
    return {
      [actionId]: this._restifier.actionRequestToRest(request)
    };
  }

  // TODO: DELETE request
}
