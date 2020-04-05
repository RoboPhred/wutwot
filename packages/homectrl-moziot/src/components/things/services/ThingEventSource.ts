import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";

export const ThingEventSource: Identifier<ThingEventSource> = createSymbol(
  "ThingEventSource"
);
export interface ThingEventSource {
  on(event: "thing.add", handler: ThingAddedEventHandler): this;
  once(event: "thing.add", handler: ThingAddedEventHandler): this;
  removeListener(event: "thing.add", handler: ThingAddedEventHandler): this;

  on(event: "thing.remove", handler: ThingRemovedEventHandler): this;
  once(event: "thing.remove", handler: ThingRemovedEventHandler): this;
  removeListener(
    event: "thing.remove",
    handler: ThingRemovedEventHandler
  ): this;
}

export type ThingAddedEventHandler = (e: ThingAddedEventArgs) => void;

export interface ThingAddedEventArgs {
  thingId: string;
  thing: Thing;
}

export type ThingRemovedEventHandler = (e: ThingRemovedEventArgs) => void;

export interface ThingRemovedEventArgs {
  thingId: string;
  // TODO: Add Thing for removing event handlers.
}
