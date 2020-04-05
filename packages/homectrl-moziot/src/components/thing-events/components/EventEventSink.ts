import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent } from "../types";

export const EventEventSink: Identifier<EventEventSink> = createSymbol(
  "EventEventSink"
);
export interface EventEventSink {
  onEventAdded(event: ThingEvent): void;
  onEventRemoved(event: ThingEvent): void;
}
