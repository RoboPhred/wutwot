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
    private _actionIds = new Set<string>();

    createAction(def: ThingActionDef, owner: MozIotPlugin): InternalAction {
      validateActionDefOrThrow(def);
      const id = `${owner.id}-${def.pluginLocalId}`;

      if (this._actionIds.has(id)) {
        throw new Error(
          `Plugin-Local ID ${def.pluginLocalId} is already in use.`,
        );
      }
      this._actionIds.add(id);

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
