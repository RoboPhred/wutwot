import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty } from "../types";

export const PropertyEventSink: Identifier<PropertyEventSink> = createSymbol(
  "PropertyEventSink"
);
export interface PropertyEventSink {
  onPropertyAdded(
    thingId: string,
    propertyId: string,
    property: ThingProperty
  ): void;
  onPropertyRemoved(thingId: string, propertyId: string): void;
}
