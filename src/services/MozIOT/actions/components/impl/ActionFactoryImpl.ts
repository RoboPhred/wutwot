import uuidV4 from "uuid/v4";

import { ThingActionDef, ThingAction } from "../../types";

import { ActionFactory } from "../ActionFactory";
import { ThingActionImpl } from "./ThingActionImpl";
import { injectable, singleton, provides } from "microinject";

@injectable()
@singleton()
@provides(ActionFactory)
export class ActionFactoryImpl implements ActionFactory {
  createAction(
    action: ThingActionDef,
    thingId: string,
    owner: object
  ): ThingAction {
    return new ThingActionImpl(action, uuidV4(), thingId, owner);
  }
}
