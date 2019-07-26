import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingProperty } from "../types";

import { PropertyRegistry } from "./PropertyRegistry";

export const PropertyRepository: Identifier<PropertyRepository> = createSymbol(
  "PropertyRepository"
);

export interface PropertyRepository extends PropertyRegistry {
  addProperty(thingId: string, property: ThingProperty): void;
  removeProperty(thingId: string, propertyId: string): void;
}
