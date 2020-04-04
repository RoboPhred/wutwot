import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";

/**
 * @internalz
 */
export namespace InternalThingCreationParams {
  export const ThingDef = "thingDef";
  export const ThingId = "thingId";
  export const Owner = "owner";
}

export const InternalThing: Identifier<InternalThing> = createSymbol(
  "InternalThing"
);
export interface InternalThing extends Thing {}
