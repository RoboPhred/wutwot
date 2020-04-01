import { EventFactory } from "../EventFactory";

import { ThingEventDef, ThingEvent } from "../../types";
import { ThingEventImpl } from "./ThingEventImpl";
import { IdMapper } from "../../../../utils";

export class EventFactoryImpl implements EventFactory {
  private _thingPropertyIdMappers = new Map<string, IdMapper>();

  createEvent(
    eventDef: ThingEventDef,
    thingId: string,
    owner: object
  ): ThingEvent {
    let idMapper = this._thingPropertyIdMappers.get(thingId);
    if (idMapper == null) {
      idMapper = new IdMapper();
      this._thingPropertyIdMappers.set(thingId, idMapper);
    }
    const id = idMapper.createId(eventDef.title);

    return new ThingEventImpl(eventDef, id, thingId, owner);
  }
}
