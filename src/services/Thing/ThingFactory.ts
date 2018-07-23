import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingDef } from "../../contracts/ThingSource";

import { Thing } from "./Thing";

export const ThingFactory: Identifier<ThingFactory> = createSymbol(
  "ThingFactory"
);
export interface ThingFactory {
  createThing(def: ThingDef): Thing;
}
