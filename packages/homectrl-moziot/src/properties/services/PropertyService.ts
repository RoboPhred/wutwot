import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingProperty, ThingPropertyDef } from "../types";

export const PropertyService: Identifier<PropertyService> = createSymbol(
  "PropertyService"
);
export interface PropertyService {
  getProperty(thingId: string, propertyId: string): ThingProperty | undefined;
  getForThing(thingId: string): ThingProperty[];

  addProperty(
    thingId: string,
    propertyDef: ThingPropertyDef,
    owner: object
  ): ThingProperty;
}
