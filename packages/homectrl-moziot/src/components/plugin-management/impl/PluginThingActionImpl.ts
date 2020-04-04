import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../../types";

import { ThingAction } from "../../actions";
import {
  ThingActionRequest,
  ThingActionRequestDef,
  ActionRequestService
} from "../../action-requests";

import { OwnedPluginThingAction, PluginAdapter } from "../types";

export class PluginThingActionImpl implements OwnedPluginThingAction {
  constructor(
    private _action: ThingAction,
    private _pluginAdapter: PluginAdapter,
    private _actionRequestService: ActionRequestService
  ) {}

  get id(): string {
    return this._action.id;
  }

  get thingId(): string {
    return this._action.thingId;
  }

  get ownerPlugin(): object {
    return this._action.ownerPlugin;
  }

  get title(): string {
    return this._action.title;
  }

  get semanticType(): string | undefined {
    return this._action.semanticType;
  }

  get description(): string {
    return this._action.description;
  }

  get input(): DeepImmutableObject<JSONSchema6> {
    return this._action.input;
  }

  get requests(): readonly ThingActionRequest[] {
    return this._action.requests;
  }

  isOwned(): this is OwnedPluginThingAction {
    return this._action.ownerPlugin === this._pluginAdapter.plugin;
  }

  addRequest(def: ThingActionRequestDef): ThingActionRequest {
    if (!this.isOwned()) {
      throw new Error(
        "The requesting plugin does not own this action.  Requests can only be added by the plugin that owns the action."
      );
    }
    const request = this._actionRequestService.addRequest(
      this._action.thingId,
      this._action.id,
      def
    );
    return request;
  }

  request(input: any): ThingActionRequest {
    return this._action.request(input);
  }

  toAction(): ThingAction {
    return this._action;
  }
}
