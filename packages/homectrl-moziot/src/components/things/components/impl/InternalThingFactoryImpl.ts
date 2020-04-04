import { Context } from "microinject";

import { IdMapper } from "../../../../utils";

import { Thing, ThingDef, validateThingDefOrThrow } from "../../types";
import { InternalThing, InternalThingCreationParams } from "../../services";

import { InternalThingFactory } from "../InternalThingFactory";

// TODO: Keep this as a class based factory.
//  Needs to be able to request injection of service locator / context
export function internalThingFactoryImpl(
  context: Context
): InternalThingFactory {
  class ThingFactoryImpl implements InternalThingFactory {
    private _idMapper = new IdMapper();

    createThing(def: ThingDef, owner: object): Thing {
      validateThingDefOrThrow(def);
      const id = this._idMapper.createId(def.title);
      return context.get(InternalThing, {
        [InternalThingCreationParams.ThingId]: id,
        [InternalThingCreationParams.ThingDef]: def,
        [InternalThingCreationParams.Owner]: owner
      });
    }
  }
  return new ThingFactoryImpl();
}
