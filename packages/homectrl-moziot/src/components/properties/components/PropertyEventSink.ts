import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty } from "../types";

export const PropertyEventSink: Identifier<PropertyEventSink> = createSymbol(
  "PropertyEventSink"
);
export interface PropertyEventSink {
  onPropertyAdded(property: ThingProperty): void;
  onPropertyRemoved(property: ThingProperty): void;
}
