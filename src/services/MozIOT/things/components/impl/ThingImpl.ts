import { ReadonlyRecord } from "../../../../../types";

import { Thing, ThingAction, ThingDef } from "../../types";

export class ThingImpl implements Thing {
  private readonly _metadata: Record<string, any>;

  constructor(
    private _def: ThingDef,
    private _id: string,
    private _ownerId: string
  ) {
    this._def = {
      ..._def
    };
    this._metadata = { ..._def.metadata };
  }

  get id(): string {
    return this._id;
  }

  get ownerPluginId(): string {
    return this._ownerId;
  }

  get name(): string {
    return this._def.name;
  }

  get types(): ReadonlyArray<string> {
    // TODO: Types from capabilities.
    return [];
  }

  get description(): string {
    return this._def.description;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    // TODO: actions from capabilities
    return {};
  }
}
