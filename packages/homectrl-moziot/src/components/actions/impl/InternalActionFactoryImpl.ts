import { Context } from "microinject";

import { IdMapper } from "../../../utils";

import { ThingActionDef, validateActionDefOrThrow } from "../types";
import { InternalAction, InternalActionParams } from "../services";

import { InternalActionFactory } from "../components";
import { InternalThingParams } from "../../things";

// TODO: Keep this as a class based factory.
//  Needs to be able to request injection of service locator / context
export function internalThingFactoryImpl(
  context: Context
): InternalActionFactory {
  class InternalActionFactoryImpl implements InternalActionFactory {
    private _idMapper = new IdMapper();

    createAction(def: ThingActionDef, owner: object): InternalAction {
      validateActionDefOrThrow(def);
      const id = this._idMapper.createId(def.title);
      return context.get(InternalAction, {
        [InternalActionParams.ActionId]: id,
        [InternalActionParams.ThingId]:
          context.parameters[InternalThingParams.ThingId],
        [InternalActionParams.ActionDef]: def,
        [InternalActionParams.Owner]: owner
      });
    }
  }
  return new InternalActionFactoryImpl();
}