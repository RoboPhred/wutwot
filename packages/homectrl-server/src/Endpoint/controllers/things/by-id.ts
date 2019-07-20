import { injectable, inject } from "microinject";
import { MozIot } from "homectrl-moziot";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";

import { Restifier } from "../../restifier";
import { controller, get, param } from "../../infrastructure";

@injectable()
@controller("/things/:thingId")
export class ThingById {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getThingById(@param("thingId") thingId: string) {
    const thing = this._mozIot.things.find(x => x.id === thingId);
    if (!thing) {
      throw createError(
        HttpStatusCodes.NOT_FOUND,
        "A Thing with the specified ID was not found."
      );
    }
    return this._restifier.thingToRest(thing);
  }
}
