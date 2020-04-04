import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty, ThingPropertyDef } from "../types";

export const LocalPropertiesManager: Identifier<LocalPropertiesManager> = createSymbol(
  "LocalPropertiesManager"
);
export interface LocalPropertiesManager {
  getProperty(propertyId: string): ThingProperty | undefined;
  getAllProperties(): ThingProperty[];

  createProperty(propertyDef: ThingPropertyDef, owner: object): ThingProperty;
}
