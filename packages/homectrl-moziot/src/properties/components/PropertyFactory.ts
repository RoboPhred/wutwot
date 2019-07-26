import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingPropertyDef, ThingProperty } from "../types";

export const PropertyFactory: Identifier<PropertyFactory> = createSymbol(
  "PropertyFactory"
);
export interface PropertyFactory {
  createProperty(
    propertyDef: ThingPropertyDef,
    thingId: string,
    owner: object
  ): ThingProperty;
}
