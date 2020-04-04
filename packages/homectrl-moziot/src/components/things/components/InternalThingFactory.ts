import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef } from "../types";
import { InternalThing } from "../services";

export const InternalThingFactory: Identifier<InternalThingFactory> = createSymbol(
  "ThingFactory"
);
export interface InternalThingFactory {
  createThing(def: ThingDef, owner: object): InternalThing;
}
