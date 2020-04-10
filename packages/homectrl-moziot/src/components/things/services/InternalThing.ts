import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../types";
import { ThingPropertyDef, ThingProperty } from "../../properties";
import { ThingEventDef, ThingEvent } from "../../thing-events";
import { ThingActionDef, InternalAction } from "../../actions";
import { ReadonlyRecord } from "../../../types";

/**
 * @internal
 */
export namespace InternalThingParams {
  export const ThingDef = "thingDef";
  export const ThingId = "thingId";
  export const Owner = "thingOwner";
}

export const InternalThing: Identifier<InternalThing> = createSymbol(
  "InternalThing",
);
export interface InternalThing extends Thing {
  readonly publicProxy: Thing;

  readonly actions: ReadonlyMap<string, InternalAction>;

  addSemanticType(type: string): void;
  addProperty(def: ThingPropertyDef, owner: object): ThingProperty;
  addAction(def: ThingActionDef, owner: object): InternalAction;
  addEvent(def: ThingEventDef, owner: object): ThingEvent;
}
