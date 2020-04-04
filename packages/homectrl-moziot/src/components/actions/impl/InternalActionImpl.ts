import { injectable, inScope, injectParam, inject } from "microinject";
import { JSONSchema6 } from "json-schema";
import { inspect } from "util";

import { DeepImmutableObject } from "../../../types";
import { makeReadOnly } from "../../../utils/readonly";
import { makeInspectJson } from "../../../utils/inspect";
import { createWhitelistProxy } from "../../../utils/proxies";

import { ThingAction, ThingActionDef, ThingActionKeys } from "../types";
import { validateOrThrow } from "../../json-schema";

import {
  ThingActionRequest,
  ThingActionRequestDef,
  LocalActionRequestsManager
} from "../../action-requests";

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
    @inject(LocalActionRequestsManager)
    private _requestsManager: LocalActionRequestsManager
  ) {
    this._def = { ...def };

    this._publicProxy = createWhitelistProxy(this, ThingActionKeys);
  }

  [inspect.custom] = makeInspectJson("ThingAction");

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
    return makeReadOnly(this._requestsManager.getAllRequests());
  }

  request(input: any): ThingActionRequest {
    validateOrThrow(input, this._def.input);

    const status = this._def.onActionInvocationRequested(
      this._thingId,
      this._id,
      input
    );

    return this._requestsManager.addRequest({
      input,
      timeRequested: new Date().toISOString(),
      status
    });
  }

  addRequest(requestDef: ThingActionRequestDef): ThingActionRequest {
    return this._requestsManager.addRequest(requestDef);
  }

  toJSON() {
    return {
      id: this.id,
      thingId: this.thingId,
      ownerPlugin: this.ownerPlugin,
      title: this.title,
      semanticType: this.semanticType,
      description: this.description,
      input: this.input,
      requests: this.requests.map(x => x.toJSON())
    };
  }
}
