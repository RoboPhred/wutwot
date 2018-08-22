import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingContext } from "../contracts";

export const ThingRepository: Identifier<ThingRepository> = createSymbol(
  "ThingRepository"
);

export interface ThingRepository {
  addThing(thing: ThingContext): void;
  removeThing(thingId: string): void;
}
