import { injectable, inScope, injectParam } from "microinject";
import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../../types";
import { makeReadOnly } from "../../../utils/readonly";
import { createWhitelistProxy } from "../../../utils/proxies";

import { ThingAction, ThingActionDef, ThingActionKeys } from "../types";
import { validateOrThrow } from "../../json-schema";

import {
  ThingActionRequest,
  ThingActionRequestDef
} from "../../action-requests";

// TODO: Components should not be used outside their service scope.
//  We need to access this functionality from an action-request service.
import { ActionRequestFactory } from "../../action-requests/components/ActionRequestFactory";
import { ActionRequestRepository } from "../../action-requests/components/ActionRequestRepository";
import { ThingScope } from "../../things";

import { InternalActionParams, InternalAction } from "../services";
import { asActionScope } from "../scopes";

@injectable()
@inScope(ThingScope)
@asActionScope()
export class InternalActionImpl implements InternalAction {
  private _publicProxy: ThingAction;

  private _def: ThingActionDef;

  constructor(
    @injectParam(InternalActionParams.ActionDef)
    def: ThingActionDef,
    @injectParam(InternalActionParams.ActionId)
    private _id: string,
    @injectParam(InternalActionParams.ThingId)
    private _thingId: string,
    @injectParam(InternalActionParams.Owner)
    private _owner: object,
    private _actionRequestFactory: ActionRequestFactory,
    private _actionRepository: ActionRequestRepository
  ) {
    this._def = { ...def };

    this._publicProxy = createWhitelistProxy(this, ThingActionKeys);
  }

  get publicProxy(): ThingAction {
    return this._publicProxy;
  }

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thingId;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get title(): string {
    return this._def.title;
  }

  get semanticType(): string | undefined {
    return this._def.semanticType;
  }

  get description(): string {
    return this._def.description;
  }

  get input(): DeepImmutableObject<JSONSchema6> {
    return this._def.input;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    return makeReadOnly(
      this._actionRepository.getForThingAction(this._thingId, this._id)
    );
  }

  request(input: any): ThingActionRequest {
    validateOrThrow(input, this._def.input);

    const status = this._def.onActionInvocationRequested(
      this._thingId,
      this._id,
      input
    );

    const request = this._actionRequestFactory.createActionRequest(
      this._thingId,
      this._id,
      {
        input,
        timeRequested: new Date().toISOString(),
        status
      }
    );

    this._actionRepository.addRequest(request);
    return request;
  }

  addRequest(requestDef: ThingActionRequestDef): ThingActionRequest {
    const request = this._actionRequestFactory.createActionRequest(
      this._thingId,
      this._id,
      requestDef
    );

    this._actionRepository.addRequest(request);
    return request;
  }
}
