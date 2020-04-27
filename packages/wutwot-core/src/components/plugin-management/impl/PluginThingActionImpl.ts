import { TypedDataSchema } from "@wutwot/td";

import { DeepImmutableObject } from "../../../immutable";

import { InternalAction, ThingAction } from "../../actions";
import {
  ThingActionRequest,
  ThingActionRequestDef,
} from "../../action-requests";

import { OwnedPluginThingAction, PluginAdapter } from "../types";

export class PluginThingActionImpl implements OwnedPluginThingAction {
  constructor(
    private _action: InternalAction,
    private _pluginAdapter: PluginAdapter,
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

  get title(): string | undefined {
    return this._action.title;
  }

  get semanticTypes(): readonly string[] {
    return this._action.semanticTypes;
  }

  get description(): string | undefined {
    return this._action.description;
  }

  get input(): DeepImmutableObject<TypedDataSchema> | undefined {
    return this._action.input;
  }

  get output(): DeepImmutableObject<TypedDataSchema> | undefined {
    return this._action.output;
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
        "The requesting plugin does not own this action.  Requests can only be added by the plugin that owns the action.",
      );
    }
    return this._action.addRequest(def);
  }

  invoke(input: any): ThingActionRequest {
    return this._action.invoke(input);
  }

  toAction(): ThingAction {
    return this._action;
  }

  toJSON() {
    return this._action.toJSON();
  }

  toJSONLD() {
    return this._action.toJSON();
  }
}
