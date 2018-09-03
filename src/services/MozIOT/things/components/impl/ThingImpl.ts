import { ReadonlyRecord } from "../../../../../types";

import { ThingTypesService } from "../../../thing-types";

import { ActionService, ThingAction } from "../../../actions";

import { Thing, ThingDef } from "../../types";

export class ThingImpl implements Thing {
  private readonly _metadata: Record<string, any>;

  constructor(
    private _def: ThingDef,
    private _id: string,
    private _owner: object,
    private _typesService: ThingTypesService,
    private _actionService: ActionService
  ) {
    this._def = {
      ..._def
    };
    this._metadata = { ..._def.metadata };
  }

  get id(): string {
    return this._id;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get name(): string {
    return this._def.name;
  }

  get types(): ReadonlyArray<string> {
    return this._typesService.getTypes(this._id);
  }

  get description(): string {
    return this._def.description;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    const actions: Record<string, ThingAction> = {};
    this._actionService.getForThing(this._id).forEach(action => {
      actions[action.id] = action;
    });

    return Object.seal(actions);
  }
}
