import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingPropertyDef, ThingProperty } from "../../properties";
import { ThingEventDef, ThingEvent } from "../../thing-events";
import { ThingActionDef, InternalAction } from "../../actions";
import { DataPersistence } from "../../persistence";

import { Thing } from "../types";

/**
 * @internal
 */
export namespace InternalThingParams {
  export const ThingDef = "thingDef";
  export const ThingId = "thingId";
  export const Owner = "thingOwner";
}

/**
 * @internal
 */
export const InternalThing: Identifier<InternalThing> = createSymbol(
  "InternalThing",
);

/**
 * @internal
 */
export interface InternalThing extends Thing {
  readonly publicProxy: Thing;

  readonly actions: ReadonlyMap<string, InternalAction>;

  readonly persistence: DataPersistence;

  addSemanticType(type: string): void;
  addProperty(def: ThingPropertyDef, owner: object): ThingProperty;
  addAction(def: ThingActionDef, owner: object): InternalAction;
  addEvent(def: ThingEventDef, owner: object): ThingEvent;
}
