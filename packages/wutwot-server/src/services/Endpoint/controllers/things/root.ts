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
  async getThings() {
    const allThings = Array.from(this._wutwot.things.values());
    const body = await Promise.all(
      allThings.map((thing) => this._restifier.thingToRest(thing, false)),
    );

    return body;
  }
}
