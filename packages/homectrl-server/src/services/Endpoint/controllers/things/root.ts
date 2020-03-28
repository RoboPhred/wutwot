import { injectable, inject } from "microinject";
import { MozIot } from "homectrl-moziot";

import { Restifier } from "../../Restifier";
import { controller, get } from "../../infrastructure";

@injectable()
@controller("/things")
export class ThingsRoot {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getThings() {
    const body = this._mozIot.things.map(thing =>
      this._restifier.thingToRest(thing, false)
    );

    return body;
  }
}
