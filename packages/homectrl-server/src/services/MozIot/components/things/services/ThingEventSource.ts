import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";

export const ThingEventSource: Identifier<ThingEventSource> = createSymbol(
  "ThingEventSource"
);
export interface ThingEventSource {
  on(event: "thing.add", handler: (e: ThingAddedEventArgs) => void): this;
  on(event: "thing.remove", handler: (e: ThingRemovedEventArgs) => void): this;
  removeListener(event: string, handler: Function): this;
}

export interface ThingAddedEventArgs {
  thingId: string;
  thing: Thing;
}

export interface ThingRemovedEventArgs {
  thingId: string;
}
