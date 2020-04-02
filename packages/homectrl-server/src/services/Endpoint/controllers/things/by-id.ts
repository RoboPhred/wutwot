import { injectable, inject } from "microinject";
import { MozIot } from "homectrl-moziot";

import { Restifier } from "../../Restifier";
import { controller, get, param } from "../../infrastructure";
import { getThingOrThrow } from "../../controller-utils";

@injectable()
@controller("/things/:thingId")
export class ThingById {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  getThingById(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    return this._restifier.thingToRest(thing);
  }
}
