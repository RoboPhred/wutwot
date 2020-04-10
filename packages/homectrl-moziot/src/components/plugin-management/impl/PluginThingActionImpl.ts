import { DeepImmutableObject } from "../../../types";

import { InternalAction, ThingAction } from "../../actions";
import {
  ThingActionRequest,
  ThingActionRequestDef,
} from "../../action-requests";

import { OwnedPluginThingAction, PluginAdapter } from "../types";
import { DataSchema } from "../../data-schema";

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

  get title(): string {
    return this._action.title;
  }

  get semanticType(): string | undefined {
    return this._action.semanticType;
  }

  get description(): string {
    return this._action.description;
  }

  get input(): DeepImmutableObject<DataSchema> | undefined {
    return this._action.input;
  }

  get output(): DeepImmutableObject<DataSchema> | undefined {
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

  request(input: any): ThingActionRequest {
    return this._action.request(input);
  }

  toAction(): ThingAction {
    return this._action;
  }

  toJSON() {
    return this._action.toJSON();
  }
}
