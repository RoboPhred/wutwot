import { ReadonlyRecord } from "../../../../types";

import { ThingTypesService } from "../../../thing-types";

import { ActionService, ThingAction } from "../../../actions";
import { ThingProperty, PropertyService } from "../../../properties";

import { Thing, ThingDef } from "../../types";

export class ThingImpl implements Thing {
  private readonly _metadata: Record<string, any>;

  constructor(
    private _def: ThingDef,
    private _id: string,
    private _owner: object,
    private _typesService: ThingTypesService,
    private _actionService: ActionService,
    private _propertyService: PropertyService
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

  get title(): string {
    return this._def.title;
  }

  get types(): ReadonlyArray<string> {
    return this._typesService.getTypes(this._id);
  }

  get description(): string | null {
    return this._def.description || null;
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

  get properties(): ReadonlyRecord<string, ThingProperty> {
    const things: Record<string, ThingProperty> = {};
    this._propertyService.getForThing(this._id).forEach(thing => {
      things[thing.id] = thing;
    });
    return Object.seal(things);
  }
}
