import { injectable, provides, injectParam, inject } from "microinject";

import { LegacyIdMapper } from "../../../utils/LegacyIdMapper";

import { InternalThingParams, inThingScope } from "../../things";

import { ThingActionDef } from "../types";

import { LocalActionsManager } from "../services/LocalActionsManager";

import { ActionEventSink, InternalActionFactory } from "../components";

import { InternalAction } from "../services";

@injectable()
@inThingScope()
@provides(LocalActionsManager)
export class LocalActionsManagerImpl implements LocalActionsManager {
  private _idMapper = new LegacyIdMapper();
  private _actionsById = new Map<string, InternalAction>();

  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(ActionEventSink)
    private _eventSink: ActionEventSink,
    @inject(InternalActionFactory)
    private _actionFactory: InternalActionFactory,
  ) {}

  getAction(actionId: string): InternalAction | undefined {
    return this._actionsById.get(actionId);
  }

  getAllActions(): InternalAction[] {
    return Array.from(this._actionsById.values());
  }

  addAction(def: ThingActionDef, owner: object): InternalAction {
    const action = this._actionFactory.createAction(def, owner);
    this._actionsById.set(action.id, action);
    this._eventSink.onActionAdded(action);
    return action;
  }
}
