import { Context } from "microinject";

import { IdMapper } from "../../../utils";

import { ThingDef, validateThingDefOrThrow } from "../types";
import { InternalThing, InternalThingParams } from "../services";

import { InternalThingFactory } from "../components";

// TODO: Keep this as a class based factory.
//  Needs to be able to request injection of service locator / context
export function internalThingFactoryImpl(
  context: Context
): InternalThingFactory {
  class InternalThingFactoryImpl implements InternalThingFactory {
    private _idMapper = new IdMapper();

    createThing(def: ThingDef, owner: object): InternalThing {
      validateThingDefOrThrow(def);
      const id = this._idMapper.createId(def.title);
      return context.get(InternalThing, {
        [InternalThingParams.ThingId]: id,
        [InternalThingParams.ThingDef]: def,
        [InternalThingParams.Owner]: owner
      });
    }
  }
  return new InternalThingFactoryImpl();
}
