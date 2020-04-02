import { injectable, inject } from "microinject";
import { MozIot } from "homectrl-moziot";
import { sortBy, flatMap, values } from "lodash";

import { controller, get, param } from "../../../infrastructure";
import { Restifier } from "../../../Restifier";
import { getThingOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/events")
export class ThingEventsRoot {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  getThingEvents(@param("thingId") thingId: string) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    let records = flatMap(values(thing.events), event => event.records);
    records = sortBy(records, record => record.timestamp);
    return records.map(record => this._restifier.eventRecordToRest(record));
  }
}
