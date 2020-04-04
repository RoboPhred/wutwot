import { Identifier } from "microinject";

import { Thing, ThingDef } from "../types";

import createSymbol from "../../../create-symbol";

export const InternalThingFactory: Identifier<InternalThingFactory> = createSymbol(
  "ThingFactory"
);
export interface InternalThingFactory {
  createThing(def: ThingDef, owner: object): Thing;
}
