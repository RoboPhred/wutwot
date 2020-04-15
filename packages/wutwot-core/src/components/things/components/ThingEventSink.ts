import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";

export const ThingEventSink: Identifier<ThingEventSink> = createSymbol(
  "ThingEventSink",
);
export interface ThingEventSink {
  onThingAdded(thing: Thing): void;
  onThingRemoved(thing: Thing): void;
}
