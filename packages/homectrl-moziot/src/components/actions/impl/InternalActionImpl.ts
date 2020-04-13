import {
  injectable,
  inScope,
  injectParam,
  inject,
  provides,
} from "microinject";
import { inspect } from "util";
import { isObservable } from "rxjs";

import { DeepImmutableObject } from "../../../types";
import { makeReadOnly } from "../../../utils/readonly";
import { makeInspectJson } from "../../../utils/inspect";

import { validateOrThrow } from "../../json-schema";

import {
  ThingActionRequest,
  ThingActionRequestDef,
  LocalActionRequestsManager,
  ThingActionRequestStatus,
} from "../../action-requests";

import { ThingScope } from "../../things";

import { ThingAction, ThingActionDef, ThingActionKeys } from "../types";
import { InternalActionParams, InternalAction } from "../services";
import { asActionScope } from "../scopes";
import { DataSchema } from "../../data-schema";

@injectable()
@inScope(ThingScope)
@asActionScope()
@provides(InternalAction)
export class InternalActionImpl implements InternalAction {
  private _publicAPI: ThingAction;

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
    private _requestsManager: LocalActionRequestsManager,
  ) {
    this._def = { ...def };

    this._publicAPI = createPublicActionApi(this);
  }

  [inspect.custom] = makeInspectJson("ThingAction");

  get publicAPI(): ThingAction {
    return this._publicAPI;
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

  get title(): string | undefined {
    return this._def.title;
  }

  get semanticTypes(): readonly string[] {
    var value: string[] = [];

    if (Array.isArray(this._def.semanticType)) {
      value = [...this._def.semanticType];
    } else if (typeof this._def.semanticType === "string") {
      value = [this._def.semanticType];
    }

    return makeReadOnly(value);
  }

  get description(): string | undefined {
    return this._def.description;
  }

  get input(): DeepImmutableObject<DataSchema> | undefined {
    return this._def.input;
  }

  get output(): DeepImmutableObject<DataSchema> | undefined {
    return this._def.output;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    return makeReadOnly(this._requestsManager.getAllRequests());
  }

  request(input: any): ThingActionRequest {
    const { input: inputSchema, onActionInvocationRequested } = this._def;

    if (inputSchema) {
      validateOrThrow(input, inputSchema);
    }

    const status = onActionInvocationRequested(this._thingId, this._id, input);

    if (!isObservable(status)) {
      // TODO: More details about the plugin that caused the error.
      //  This is being thrown to the requester, but it is the fault of the plugin.
      throw new TypeError(
        "Expected onActionInvocationRequested to return an observable.",
      );
    }

    return this._requestsManager.addRequest({
      input,
      timeRequested: new Date().toISOString(),
      initialStatus: ThingActionRequestStatus.Pending,
      status,
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
      semanticType: this.semanticTypes,
      description: this.description,
      input: this.input,
      requests: this.requests.map((x) => x.toJSON()),
    };
  }
}

function createPublicActionApi(action: InternalAction): ThingAction {
  class PublicAction implements ThingAction {
    get [Symbol.toStringTag]() {
      return "ThingAction";
    }

    [inspect.custom] = makeInspectJson("ThingAction");

    get id() {
      return action.id;
    }

    get thingId() {
      return action.thingId;
    }

    get ownerPlugin() {
      return action.ownerPlugin;
    }

    get title() {
      return action.title;
    }

    get semanticTypes() {
      return action.semanticTypes;
    }

    get description() {
      return action.description;
    }

    get input() {
      return action.input;
    }

    get output() {
      return action.output;
    }

    get requests() {
      return action.requests;
    }

    request(input: any) {
      return action.request(input);
    }

    toJSON() {
      return action.toJSON();
    }
  }

  return new PublicAction();
}
