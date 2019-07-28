import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { Thing } from "../types";

export const ThingRegistry: Identifier<ThingRegistry> = createSymbol(
  "ThingRegistry"
);

export interface ThingRegistry {
  [Symbol.iterator](): IterableIterator<Thing>;

  get(thingId: string): Thing | undefined;
}
