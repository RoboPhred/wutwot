import { Context } from "microinject";

import { InternalThingParams, ThingsManager } from "../../things";
import { WutWotPlugin } from "../../plugin-management";

import { ThingActionDef, validateActionDefOrThrow } from "../types";
import { InternalAction, InternalActionParams } from "../services";
import { InternalActionFactory } from "../components";

// TODO: Keep this as a class based factory.
//  Needs to be able to request injection of service locator / context
export function internalActionFactoryImpl(
  context: Context,
): InternalActionFactory {
  const thingsManager = context.get(ThingsManager);
  const thingId = context.parameters[InternalThingParams.ThingId];

  class InternalActionFactoryImpl implements InternalActionFactory {
    createAction(
      id: string,
      def: ThingActionDef,
      owner: WutWotPlugin,
    ): InternalAction {
      validateActionDefOrThrow(def);

      // We have to wait until now to get our thing, as the factory is instantiated to be injected into the thing's constructor.
      const thing = thingsManager.get(thingId);
      if (!thing) {
        throw new Error(
          "Tried to create an action for a Thing that is not yet registered.",
        );
      }

      return context.get(InternalAction, {
        [InternalActionParams.ActionId]: id,
        [InternalActionParams.ActionDef]: def,
        [InternalActionParams.Thing]: thing.publicProxy,
        [InternalActionParams.Plugin]: owner,
      });
    }
  }
  return new InternalActionFactoryImpl();
}
