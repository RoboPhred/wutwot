import { Context } from "microinject";

import { MozIotPlugin } from "../../plugin-management";

import { ThingDef, validateThingDefOrThrow } from "../types";
import { InternalThing, InternalThingParams } from "../services";

import { InternalThingFactory, ThingIdMapper } from "../components";

// TODO: Keep this as a class based factory.
//  Needs to be able to request injection of service locator / context
export function internalThingFactoryImpl(
  context: Context
): InternalThingFactory {
  const idMapper = context.get(ThingIdMapper);

  class InternalThingFactoryImpl implements InternalThingFactory {
    createThing(def: ThingDef, owner: MozIotPlugin): InternalThing {
      validateThingDefOrThrow(def);
      const id = idMapper.createId({
        pluginId: owner.id,
        pluginLocalThingId: def.pluginLocalId
      });
      return context.get(InternalThing, {
        [InternalThingParams.ThingId]: id,
        [InternalThingParams.ThingDef]: def,
        [InternalThingParams.Owner]: owner
      });
    }
  }
  return new InternalThingFactoryImpl();
}
