import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingContext } from "../../contracts/ThingSource";

import { Thing } from "./Thing";

export const ThingFactory: Identifier<ThingFactory> = createSymbol(
  "ThingFactory"
);
export interface ThingFactory {
  createThing(context: ThingContext): Thing;
}
