import { injectable, injectParam, inject, provides } from "microinject";
import { inspect } from "util";
import { isObservable } from "rxjs";
import { cloneDeep } from "lodash";
import {
  DCMITermsIRIs,
  W3cWotTdIRIs,
  TypedDataSchema,
  W3CWotJsonSchemaContext,
  Form,
  W3cWotFormContext,
} from "@wutwot/td";

import {
  DeepImmutableArray,
  DeepImmutableObject,
  makeReadOnly,
  makeReadOnlyDeep,
} from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";

import { PluginError } from "../../../errors";
import { WutWotPlugin } from "../../plugin-management";
import { validateOrThrow } from "../../json-schema";
import {
  ThingActionRequest,
  ThingActionRequestDef,
  LocalActionRequestsManager,
  ThingActionRequestStatus,
} from "../../action-requests";
import { Thing } from "../../things";
import { FormProvider } from "../../properties";
import { getActionForms } from "../../forms";
import { addContext } from "../../../utils/json-ld";

import { ThingAction, ThingActionDef } from "../types";
import { InternalActionParams, InternalAction } from "../services";
import { asActionScope } from "../scopes";

@injectable()
@asActionScope()
@provides(InternalAction)
export class InternalActionImpl implements InternalAction {
  private _publicAPI: ThingAction;

  private _def: ThingActionDef;

  // Default value is important here as this is the only property not initialized by the time the form providers are called on this property.
  private _externalForms: DeepImmutableArray<Form> = [];

  constructor(
    @injectParam(InternalActionParams.ActionDef)
    def: ThingActionDef,
    @injectParam(InternalActionParams.ActionId)
    private _id: string,
    @injectParam(InternalActionParams.Thing)
    private _thing: Thing,
    @injectParam(InternalActionParams.Plugin)
    private _owner: WutWotPlugin,
    @inject(LocalActionRequestsManager)
    private _requestsManager: LocalActionRequestsManager,
    @inject(FormProvider, { all: true, optional: true })
    private _formProviders: FormProvider[],
  ) {
    this._def = { ...def };

    this._publicAPI = createPublicActionApi(this);

    // Do this last, as the form provider needs a reference to us.  All properties (except for external forms) must be initialized by this point.
    this._externalForms = makeReadOnlyDeep(
      getActionForms(this._formProviders, this._thing, this._publicAPI),
    );
  }

  [inspect.custom] = makeInspectJson("ThingAction");

  get publicAPI(): ThingAction {
    return this._publicAPI;
  }

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thing.id;
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

  get forms(): DeepImmutableArray<Form> {
    return this._externalForms;
  }

  invoke(input: any): ThingActionRequest {
    const { input: inputSchema, onActionInvocationRequested } = this._def;

    if (inputSchema) {
      // TODO: DataSchema has a type property of string, but JSONSchema6 is more strict
      validateOrThrow(input, inputSchema as any);
    }

    const status = onActionInvocationRequested(this._thing.id, this._id, input);

    if (!isObservable(status)) {
      // TODO: More details about the plugin that caused the error.
      //  This is being thrown to the requester, but it is the fault of the plugin.
      throw new PluginError(
        this._owner.id,
        `Action "${this._def.pluginLocalId}" from plugin "${this._owner.id}" must return an observable.`,
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
      [DCMITermsIRIs.Title]: this.title,
      [DCMITermsIRIs.Description]: this.description,
      [W3cWotTdIRIs.HasInputSchema]: {
        "@context": W3CWotJsonSchemaContext,
        ...cloneDeep(this.input),
      },
      [W3cWotTdIRIs.HasForm]: [
        ...cloneDeep(this._externalForms).map(addContext(W3cWotFormContext)),
      ],
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

    get forms() {
      return action.forms;
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
