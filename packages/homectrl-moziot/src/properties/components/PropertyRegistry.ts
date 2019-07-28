import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingProperty } from "../types";

export const PropertyRegistry: Identifier<PropertyRegistry> = createSymbol(
  "PropertyRegistry"
);
export interface PropertyRegistry {
  get(thingId: string, propertyId: string): ThingProperty | undefined;

  getForThing(thingId: string): ThingProperty[];
}
