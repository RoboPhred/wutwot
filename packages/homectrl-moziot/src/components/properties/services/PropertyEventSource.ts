import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty } from "../types";

export const PropertyEventSource: Identifier<PropertyEventSource> = createSymbol(
  "PropertyEventSource"
);
export interface PropertyEventSource {
  on(
    event: "property.add",
    handler: (e: ThingPropertyAddedEventArgs) => void
  ): this;
  once(
    event: "property.add",
    handler: (e: ThingPropertyAddedEventArgs) => void
  ): this;

  on(
    event: "property.remove",
    handler: (e: ThingPropertyRemovedEventArgs) => void
  ): this;
  once(
    event: "property.remove",
    handler: (e: ThingPropertyRemovedEventArgs) => void
  ): this;

  removeListener(event: string, handler: Function): this;
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
