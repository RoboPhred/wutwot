import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../../../../types";

import { ThingAction, ThingActionDef } from "../../types";

import { ThingActionRequest } from "../../../action-requests";
import { ActionRequestRegistry } from "../../../action-requests/components/ActionRequestRegistry";

export class ThingActionImpl implements ThingAction {
  constructor(
    private _def: ThingActionDef,
    private _id: string,
    private _thingId: string,
    private _owner: object,
    private _actionRegistry: ActionRequestRegistry
  ) {}

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thingId;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get label(): string {
    return this._def.label;
  }

  get description(): string {
    return this._def.description;
  }

  get input(): DeepImmutableObject<JSONSchema6> {
    return this._def.input;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    return Object.seal(
      this._actionRegistry.getForThingAction(this._thingId, this._id)
    );
  }

  request(input: any): ThingActionRequest {
    this._def.request(input);
  }
}
