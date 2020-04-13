import { Context } from "microinject";

import { InternalThingParams } from "../../things";
import { MozIotPlugin } from "../../plugin-management";

import { ThingActionDef, validateActionDefOrThrow } from "../types";
import { InternalAction, InternalActionParams } from "../services";
import { InternalActionFactory } from "../components";

// TODO: Keep this as a class based factory.
//  Needs to be able to request injection of service locator / context
export function internalThingFactoryImpl(
  context: Context,
): InternalActionFactory {
  class InternalActionFactoryImpl implements InternalActionFactory {
    createAction(
      id: string,
      def: ThingActionDef,
      owner: MozIotPlugin,
    ): InternalAction {
      validateActionDefOrThrow(def);

      return context.get(InternalAction, {
        [InternalActionParams.ActionId]: id,
        [InternalActionParams.ThingId]:
          context.parameters[InternalThingParams.ThingId],
        [InternalActionParams.ActionDef]: def,
        [InternalActionParams.Owner]: owner,
      });
    }
  }
  return new InternalActionFactoryImpl();
}
