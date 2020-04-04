import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef } from "../types";

import { InternalThing } from "./InternalThing";

export const ThingManager: Identifier<ThingManager> = createSymbol(
  "ThingManager"
);
export interface ThingManager {
  addThing(def: ThingDef, owner: object): InternalThing;
  removeThing(thingId: string): void;

  getThing(thingId: string): InternalThing | undefined;
  getThings(): InternalThing[];
}
