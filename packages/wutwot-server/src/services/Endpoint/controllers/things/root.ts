import { injectable, inject } from "microinject";
import { WutWot } from "@wutwot/core";
import { values } from "lodash";

import { Restifier } from "../../Restifier";
import { controller, get } from "../../infrastructure";

@injectable()
@controller("/things")
export class ThingsRoot {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  getThings() {
    const body = Array.from(this._wutwot.things.values()).map((thing) =>
      this._restifier.thingToRest(thing, false),
    );

    return body;
  }
}
