import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef } from "../types";
import { InternalThing } from "../services";

export const InternalThingFactory: Identifier<InternalThingFactory> = createSymbol(
  "InternalThingFactory",
);
export interface InternalThingFactory {
  createThing(id: string, def: ThingDef, owner: object): InternalThing;
}
