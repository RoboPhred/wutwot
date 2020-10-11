import { injectable, injectParam, inject, provides } from "microinject";
import { inspect } from "util";
import { isObservable } from "rxjs";
import { cloneDeep } from "lodash";
import {
  DCMITermsTerms,
  W3cWotTDTerms,
  TypedDataSchema,
  W3CWotJsonSchemaContext,
} from "@wutwot/td";

import { DeepImmutableObject, makeReadOnly } from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";

import { validateOrThrow } from "../../json-schema";

import {
  ThingActionRequest,
  ThingActionRequestDef,
  LocalActionRequestsManager,
  ThingActionRequestStatus,
} from "../../action-requests";

import { ThingAction, ThingActionDef } from "../types";
import { InternalActionParams, InternalAction } from "../services";
import { asActionScope } from "../scopes";

@injectable()
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

  get input(): DeepImmutableObject<TypedDataSchema> | undefined {
    return this._def.input;
  }

  get output(): DeepImmutableObject<TypedDataSchema> | undefined {
    return this._def.output;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    return makeReadOnly(this._requestsManager.getAllRequests());
  }

  invoke(input: any): ThingActionRequest {
    const { input: inputSchema, onActionInvocationRequested } = this._def;

    if (inputSchema) {
      // TODO: DataSchema has a type property of string, but JSONSchema6 is more strict
      validateOrThrow(input, inputSchema as any);
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
      input: cloneDeep(this.input),
      requests: this.requests.map((x) => x.toJSON()),
    };
  }

  toJSONLD() {
    return {
      "@index": this.id,
      "@type": [...this.semanticTypes],
      [DCMITermsTerms.Title]: this.title,
      [DCMITermsTerms.Description]: this.description,
      [W3cWotTDTerms.HasInputSchema]: {
        "@context": W3CWotJsonSchemaContext,
        ...cloneDeep(this.input),
      },
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

    invoke(input: any) {
      return action.invoke(input);
    }

    toJSON() {
      return action.toJSON();
    }

    toJSONLD() {
      return action.toJSONLD();
    }
  }

  return new PublicAction();
}
