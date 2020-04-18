import { injectable, inject } from "microinject";
import { WutWot } from "@wutwot/core";

import { Restifier } from "../../Restifier";
import { controller, get, param } from "../../infrastructure";
import { getThingOrThrow } from "../../controller-utils";

@injectable()
@controller("/things/:thingId")
export class ThingById {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  async getThingById(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._wutwot, thingId);
    return await this._restifier.thingToRest(thing);
  }
}
