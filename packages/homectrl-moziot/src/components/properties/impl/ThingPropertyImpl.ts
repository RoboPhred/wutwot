import { JSONSchema6 } from "json-schema";
import { inspect } from "util";

import { makeInspectJson } from "../../../utils/inspect";

import { validateOrThrow } from "../../json-schema";

import { ThingProperty, ThingPropertyDef, ThingPropertyType } from "../types";

export class ThingPropertyImpl implements ThingProperty {
  private _lastValue: any;

  constructor(
    private _def: ThingPropertyDef,
    private _id: string,
    private _thingId: string,
    private _owner: object
  ) {
    this._def = { ..._def, enum: this.enum ? [...this.enum] : undefined };
    this._lastValue = this._def.initialValue;
    this._def.values.subscribe({
      next: (value: any) => (this._lastValue = value),
    });
  }

  [inspect.custom] = makeInspectJson("ThingProperty");

  get ownerPlugin(): object {
    return this._owner;
  }

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thingId;
  }

  get title(): string {
    return this._def.title;
  }

  get semanticType(): string | undefined {
    return this._def.semanticType;
  }

  get description(): string {
    return this._def.description;
  }

  get type(): ThingPropertyType {
    return this._def.type;
  }

  get unit(): string | undefined {
    return this._def.unit;
  }

  get enum(): string[] | undefined {
    return this._def.enum;
  }

  get minimum(): number | undefined {
    return this._def.minimum;
  }

  get maximum(): number | undefined {
    return this._def.maximum;
  }

  get multipleOf(): number | undefined {
    return this._def.multipleOf;
  }

  get readOnly(): boolean {
    return this._def.readOnly || false;
  }

  get value(): any {
    return this._lastValue;
  }

  setValue(value: any): void {
    const schema: JSONSchema6 = {
      type: this._def.type,
      enum: this._def.enum,
      minimum: this._def.minimum,
      maximum: this._def.maximum,
      multipleOf: this._def.multipleOf,
    };
    validateOrThrow(value, schema);
    this._def.onValueChangeRequested(this._thingId, this._id, value);
  }

  toJSON() {
    return {
      ownerPlugin: this.ownerPlugin,
      id: this.id,
      thingId: this.thingId,
      title: this.title,
      semanticType: this.semanticType,
      description: this.description,
      type: this.type,
      unit: this.unit,
      enum: this.enum,
      minimum: this.minimum,
      maximum: this.maximum,
      multipleOf: this.multipleOf,
      readOnly: this.readOnly,
      value: this.value,
    };
  }
}
