import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent, ThingEventDef } from "../types";

export const LocalEventsManager: Identifier<LocalEventsManager> = createSymbol(
  "LocalEventsManager",
);
export interface LocalEventsManager extends ReadonlyMap<string, ThingEvent> {
  /**
   * Creates an event and adds it to the thing.
   * @param eventDef The definition of the event to create.
   * @param owner The plugin that owns the created event.
   * @returns The new event.
   */
  createEvent(eventDef: ThingEventDef, owner: object): ThingEvent;
}
