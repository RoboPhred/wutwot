import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent, ThingEventDef } from "../types";

export const LocalEventsManager: Identifier<LocalEventsManager> = createSymbol(
  "LocalEventsManager"
);
export interface LocalEventsManager {
  getEvent(eventId: string): ThingEvent | undefined;
  getAllEvents(): ThingEvent[];

  addEvent(eventDef: ThingEventDef, owner: object): ThingEvent;
}
