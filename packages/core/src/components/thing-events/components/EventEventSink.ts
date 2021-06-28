import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingEvent, ThingEventRecord } from "../types";

export const EventEventSink: Identifier<EventEventSink> = createSymbol(
  "EventEventSink",
);
export interface EventEventSink {
  onEventAdded(event: ThingEvent): void;
  onEventRaised(event: ThingEvent, record: ThingEventRecord): void;
  onEventRemoved(event: ThingEvent): void;
}
