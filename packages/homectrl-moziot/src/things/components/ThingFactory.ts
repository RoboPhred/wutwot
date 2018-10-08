import { Identifier } from "microinject";

import { ThingDef, Thing } from "../types";

import createSymbol from "../../create-symbol";

export const ThingFactory: Identifier<ThingFactory> = createSymbol(
  "ThingFactory"
);
export interface ThingFactory {
  createThing(def: ThingDef, owner: object): Thing;
}
