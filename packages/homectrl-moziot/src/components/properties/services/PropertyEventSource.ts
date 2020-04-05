import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty } from "../types";

export const PropertyEventSource: Identifier<PropertyEventSource> = createSymbol(
  "PropertyEventSource"
);
export interface PropertyEventSource {
  on(event: "property.add", handler: ThingPropertyAddedEventHandler): this;
  once(event: "property.add", handler: ThingPropertyAddedEventHandler): this;
  removeListener(
    event: "property.add",
    handler: ThingPropertyAddedEventHandler
  ): this;

  on(event: "property.remove", handler: ThingPropertyRemovedEventHandler): this;
  once(
    event: "property.remove",
    handler: ThingPropertyRemovedEventHandler
  ): this;
  removeListener(
    event: "property.remove",
    handler: ThingPropertyRemovedEventHandler
  ): this;
}

export type ThingPropertyAddedEventHandler = (
  e: ThingPropertyAddedEventArgs
) => void;

export interface ThingPropertyAddedEventArgs {
  thingId: string;
  propertyId: string;
  property: ThingProperty;
}

export type ThingPropertyRemovedEventHandler = (
  e: ThingPropertyRemovedEventArgs
) => void;
export interface ThingPropertyRemovedEventArgs {
  thingId: string;
  propertyId: string;
  // TODO: Add ThingProperty, for removing event handlers from it.
}
