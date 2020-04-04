import { injectable, provides, injectParam, inject } from "microinject";

import { InternalThingParams, inThingScope } from "../../things";

import { ThingActionDef, ThingAction } from "../types";

import { LocalActionsManager } from "../services/LocalActionsManager";
import { ActionEventSink } from "../components/ActionEventSink";
import { IdMapper } from "../../../utils";
import { ThingActionImpl } from "./ThingActionImpl";
import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../action-requests/components";

@injectable()
@inThingScope()
@provides(LocalActionsManager)
export class ActionServiceImpl implements LocalActionsManager {
  private _idMapper = new IdMapper();
  private _actionsById = new Map<string, ThingAction>();

  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(ActionEventSink)
    private _eventSink: ActionEventSink,
    @inject(ActionRequestFactory)
    private _requestFactory: ActionRequestFactory,
    @inject(ActionRequestRepository)
    private _requestRepository: ActionRequestRepository
  ) {}

  getAction(actionId: string): ThingAction | undefined {
    return this._actionsById.get(actionId);
  }

  getAllActions(): ThingAction[] {
    return Array.from(this._actionsById.values());
  }

  addAction(def: ThingActionDef, owner: object): ThingAction {
    const id = this._idMapper.createId(def.title);
    const action = new ThingActionImpl(
      def,
      id,
      this._thingId,
      owner,
      this._requestFactory,
      this._requestRepository
    );
    this._actionsById.set(id, action);
    this._eventSink.onActionAdded(this._thingId, id, action);
    return action;
  }
}
