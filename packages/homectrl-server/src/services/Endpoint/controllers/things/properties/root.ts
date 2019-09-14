import { injectable, inject } from "microinject";
import { mapValues } from "lodash";

import { MozIot } from "../../../../MozIot";

import { Restifier } from "../../../Restifier";
import { controller, get, param } from "../../../infrastructure";
import { getThingOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/properties")
export class PropertiesRoot {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getProperties(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    return mapValues(thing.properties, x => x.value);
  }
}
