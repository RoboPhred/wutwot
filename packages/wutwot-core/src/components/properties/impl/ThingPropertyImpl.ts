import { JSONSchema6 } from "json-schema";
import { inspect } from "util";
import { W3cWotTerms, W3cWotContexts } from "@wutwot/td";

import { makeInspectJson } from "../../../utils/inspect";
import { makeReadOnly } from "../../../immutable";

import { validateOrThrow } from "../../json-schema";

import { ThingProperty, ThingPropertyDef, ThingPropertyType } from "../types";

export class ThingPropertyImpl implements ThingProperty {
  private _lastValue: any;

  constructor(
    private _def: ThingPropertyDef,
    private _id: string,
    private _thingId: string,
    private _owner: object,
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
      semanticTypes: this.semanticTypes,
      description: this.description,
      type: this.type,
      unit: this.unit,
      enum: this.enum ? [...this.enum] : undefined,
      minimum: this.minimum,
      maximum: this.maximum,
      readOnly: this.readOnly,
      value: this.value,
    };
  }

  toJSONLD() {
    return {
      "@context": {
        "@vocab": W3cWotContexts.JsonSchema,
      },
      "@index": this.id,
      [W3cWotTerms.Title]: this.title,
      [W3cWotTerms.Description]: this.description,
      // Currently relying on @vocab to specify the paths of these:
      type: this.type,
      unit: this.unit,
      enum: this.enum ? [...this.enum] : undefined,
      minimum: this.minimum,
      maximum: this.maximum,
      readOnly: this.readOnly,
    };
  }
}
