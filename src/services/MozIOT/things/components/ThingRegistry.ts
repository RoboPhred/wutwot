import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { Thing } from "../types";

export const ThingRegistry: Identifier<ThingRegistry> = createSymbol(
  "ThingRegistry"
);

export interface ThingRegistry {
  [Symbol.iterator](): IterableIterator<Thing>;

  get(thingId: string): Thing | undefined;

  on(event: "thing.add", handler: (e: ThingAddedEventArgs) => void): this;
  on(event: "thing.remove", handler: (e: ThingRemovedEventArgs) => void): this;
}

export interface ThingAddedEventArgs {
  thingId: string;
  thing: Thing;
}

export interface ThingRemovedEventArgs {
  thingId: string;
}
