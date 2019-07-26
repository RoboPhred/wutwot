import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingProperty } from "../types";

export const PropertyRegistry: Identifier<PropertyRegistry> = createSymbol(
  "PropertyRegistry"
);
export interface PropertyRegistry {
  get(thingId: string, propertyId: string): ThingProperty | undefined;

  getForThing(thingId: string): ThingProperty[];

  on(
    event: "property.add",
    handler: (e: ThingPropertyAddedEventArgs) => void
  ): this;
  on(
    event: "property.remove",
    handler: (e: ThingPropertyRemovedEventArgs) => void
  ): this;
}

export interface ThingPropertyAddedEventArgs {
  thingId: string;
  propertyId: string;
  property: ThingProperty;
}

export interface ThingPropertyRemovedEventArgs {
  thingId: string;
  propertyId: string;
}
