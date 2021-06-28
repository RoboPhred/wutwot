import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty, ThingPropertyDef } from "../types";

export const LocalPropertiesManager: Identifier<LocalPropertiesManager> = createSymbol(
  "LocalPropertiesManager",
);
export interface LocalPropertiesManager
  extends ReadonlyMap<string, ThingProperty> {
  /**
   * Creates a new property and adds it to the thing.
   * @param propertyDef The definition of the new property to add.
   * @param owner The plugin that owns the new property.
   * @returns The new property.
   */
  createProperty(propertyDef: ThingPropertyDef, owner: object): ThingProperty;
}
