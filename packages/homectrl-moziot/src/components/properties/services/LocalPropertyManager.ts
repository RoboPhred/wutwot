import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingProperty, ThingPropertyDef } from "../types";

export const LocalPropertyManager: Identifier<LocalPropertyManager> = createSymbol(
  "LocalPropertyManager"
);
export interface LocalPropertyManager {
  getProperty(propertyId: string): ThingProperty | undefined;
  getAllProperties(): ThingProperty[];

  createProperty(propertyDef: ThingPropertyDef, owner: object): ThingProperty;
}
