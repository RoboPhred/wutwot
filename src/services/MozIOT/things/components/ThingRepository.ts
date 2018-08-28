import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingDef } from "../types";

import { ThingRegistry } from "./ThingRegistry";

export const ThingRepository: Identifier<ThingRepository> = createSymbol(
  "ThingRepository"
);

export interface ThingRepository extends ThingRegistry {
  addThing(thing: ThingDef): void;
  removeThing(thingId: string): void;
}
