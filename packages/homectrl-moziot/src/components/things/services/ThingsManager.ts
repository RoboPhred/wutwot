import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef } from "../types";

import { InternalThing } from "./InternalThing";

export const ThingsManager: Identifier<ThingsManager> = createSymbol(
  "ThingsManager"
);
export interface ThingsManager {
  addThing(def: ThingDef, owner: object): InternalThing;
  removeThing(thingId: string): void;

  getThing(thingId: string): InternalThing | undefined;
  getThings(): InternalThing[];
}
