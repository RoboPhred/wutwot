import { injectable, provides, injectParam, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope } from "../../things";

import { ThingActionDef } from "../types";

import { LocalActionsManager } from "../services/LocalActionsManager";

import { ActionEventSink, InternalActionFactory } from "../components";

import { InternalAction } from "../services";

@injectable()
@inThingScope()
@provides(LocalActionsManager)
export class LocalActionsManagerImpl
  extends SelfPopulatingReadonlyMap<string, InternalAction>
  implements LocalActionsManager {
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(ActionEventSink)
    private _eventSink: ActionEventSink,
    @inject(InternalActionFactory)
    private _actionFactory: InternalActionFactory,
  ) {
    super();
  }

  createAction(def: ThingActionDef, owner: object): InternalAction {
    const action = this._actionFactory.createAction(def, owner);
    this._set(action.id, action);
    this._eventSink.onActionAdded(action);
    return action;
  }
}
