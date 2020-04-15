import { injectable, inject } from "microinject";
import { WutWot } from "@wutwot/core";
import { sortBy, flatMap, values } from "lodash";

import { controller, get, param } from "../../../infrastructure";
import { Restifier } from "../../../Restifier";
import { getThingOrThrow, getEventOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/events/:eventId")
export class ThingEventByIdRoot {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(Restifier) private _restifier: Restifier,
  ) {}

  @get()
  getThingEvents(
    @param("thingId") thingId: string,
    @param("eventId") eventId: string,
  ) {
    const thing = getThingOrThrow(this._wutwot, thingId);
    const event = getEventOrThrow(thing, eventId);
    return event.records.map((record) =>
      this._restifier.eventRecordToRest(record),
    );
  }
}
