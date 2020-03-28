import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";
import { ThingDef, Thing } from "../types";

export const ThingService: Identifier<ThingService> = createSymbol(
  "ThingService"
);
export interface ThingService {
  addThing(def: ThingDef, owner: object): Thing;
  removeThing(thingId: string): void;

  getThing(thingId: string): Thing | undefined;
  getThings(): Thing[];
}
