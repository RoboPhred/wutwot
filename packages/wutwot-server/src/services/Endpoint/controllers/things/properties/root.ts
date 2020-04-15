import { injectable, inject } from "microinject";
import { mapValues } from "lodash";
import { WutWot } from "@wutwot/core";

import { mapToObject } from "../../../../../utils/map";

import { Restifier } from "../../../Restifier";
import { controller, get, param } from "../../../infrastructure";
import { getThingOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/properties")
export class PropertiesRoot {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  getProperties(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._wutwot, thingId);
    return mapValues(mapToObject(thing.properties), (x) => x.value);
  }
}
