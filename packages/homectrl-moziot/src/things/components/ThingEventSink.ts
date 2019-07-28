import { Identifier } from "microinject";
import createSymbol from "../../create-symbol";
import { Thing } from "../types";

export const ThingEventSink: Identifier<ThingEventSink> = createSymbol(
  "ThingEventSink"
);
export interface ThingEventSink {
  onThingAdded(thingId: string, thing: Thing): void;
  onThingRemoved(thingId: string): void;
}
