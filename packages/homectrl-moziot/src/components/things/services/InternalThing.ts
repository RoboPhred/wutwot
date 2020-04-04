import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";
import { ThingPropertyDef, ThingProperty } from "../../properties";
import { ThingEventDef, ThingEvent } from "../../thing-events";

/**
 * @internalz
 */
export namespace InternalThingParams {
  export const ThingDef = "thingDef";
  export const ThingId = "thingId";
  export const Owner = "owner";
}

export const InternalThing: Identifier<InternalThing> = createSymbol(
  "InternalThing"
);
export interface InternalThing extends Thing {
  readonly publicProxy: Thing;

  addSemanticType(type: string): void;
  addProperty(def: ThingPropertyDef, owner: object): ThingProperty;
  addEvent(def: ThingEventDef, owner: object): ThingEvent;
}
