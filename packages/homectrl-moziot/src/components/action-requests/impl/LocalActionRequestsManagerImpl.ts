import { injectable, provides, inject, injectParam } from "microinject";
import { v4 as uuidV4 } from "uuid";

import { inActionScope, InternalActionParams } from "../../actions";

import { ThingActionRequest, ThingActionRequestDef } from "../types";

import { LocalActionRequestsManager } from "../services";
import { ActionRequestEventSink } from "../components";

import { ThingActionRequestImpl } from "./ThingActionRequestImpl";

@injectable()
@inActionScope()
@provides(LocalActionRequestsManager)
export class LocalActionRequestsManagerImpl
  implements LocalActionRequestsManager {
  private _requestsById = new Map<string, ThingActionRequest>();

  constructor(
    @injectParam(InternalActionParams.ThingId)
    private _thingId: string,
    @injectParam(InternalActionParams.ActionId)
    private _actionId: string,
    @inject(ActionRequestEventSink)
    private _eventSink: ActionRequestEventSink
  ) {}

  getAllRequests(): ThingActionRequest[] {
    return Array.from(this._requestsById.values());
  }

  addRequest(def: ThingActionRequestDef): ThingActionRequest {
    const id = uuidV4();
    const request = new ThingActionRequestImpl(
      id,
      this._thingId,
      this._actionId,
      def
    );
    this._requestsById.set(id, request);
    this._eventSink.onActionRequestAdded(request);
    return request;
  }
}
