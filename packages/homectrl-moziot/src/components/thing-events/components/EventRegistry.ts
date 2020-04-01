import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent } from "../types";

export const EventRegistry: Identifier<EventRegistry> = createSymbol(
  "EventRegistry"
);
export interface EventRegistry {
  get(thingId: string, propertyId: string): ThingEvent | undefined;

  getForThing(thingId: string): ThingEvent[];
}
