import { injectable, inject } from "microinject";
import { MozIot } from "@wutwot/core";
import { values } from "lodash";

import { Restifier } from "../../Restifier";
import { controller, get } from "../../infrastructure";

@injectable()
@controller("/things")
export class ThingsRoot {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  getThings() {
    const body = Array.from(this._mozIot.things.values()).map((thing) =>
      this._restifier.thingToRest(thing, false),
    );

    return body;
  }
}
