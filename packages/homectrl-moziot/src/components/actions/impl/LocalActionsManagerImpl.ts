import { injectable, provides, injectParam, inject } from "microinject";

import { IdMapper } from "../../../utils";
import { InternalThingParams, inThingScope } from "../../things";
import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../action-requests/components";

import { ThingActionDef } from "../types";

import { LocalActionsManager } from "../services/LocalActionsManager";

import { ActionEventSink } from "../components";

import { InternalAction } from "../services";

import { InternalActionImpl } from "./InternalActionImpl";

@injectable()
@inThingScope()
@provides(LocalActionsManager)
export class LocalActionsManagerImpl implements LocalActionsManager {
  private _idMapper = new IdMapper();
  private _actionsById = new Map<string, InternalAction>();

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

  getAction(actionId: string): InternalAction | undefined {
    return this._actionsById.get(actionId);
  }

  getAllActions(): InternalAction[] {
    return Array.from(this._actionsById.values());
  }

  addAction(def: ThingActionDef, owner: object): InternalAction {
    const id = this._idMapper.createId(def.title);
    const action = new InternalActionImpl(
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
