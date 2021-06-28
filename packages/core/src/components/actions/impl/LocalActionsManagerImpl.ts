import { injectable, provides, injectParam, inject } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { InternalThingParams, inThingScope } from "../../things";
import { formCompoundId, DuplicateIDError } from "../../id-mapping";

import { ThingActionDef } from "../types";

import { LocalActionsManager } from "../services/LocalActionsManager";

import { ActionEventSink, InternalActionFactory } from "../components";

import { InternalAction } from "../services";
import { WutWotPlugin } from "../../plugin-management";

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
    super("ActionsManager");
  }

  createAction(def: ThingActionDef, owner: WutWotPlugin): InternalAction {
    const id = formCompoundId(owner.id, def.pluginLocalId);
    if (this.has(id)) {
      throw new DuplicateIDError(
        `Plugin ${owner.id} has already registered an action with a plugin-local id of "${def.pluginLocalId}" on thing "${this._thingId}".`,
      );
    }

    const action = this._actionFactory.createAction(id, def, owner);
    this._set(action.id, action);
    this._eventSink.onActionAdded(action);
    return action;
  }
}
