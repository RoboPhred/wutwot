import { JSONSchema6 } from "json-schema";
import { inspect } from "util";
import {
  DCMITermsIris,
  W3cRdfSyntaxIris,
  DataSchemaType,
  W3cWotJsonSchemaIris,
  SchemaOrgIris,
  dataSchemaTypeToW3cWotClass,
} from "@wutwot/td";

import { makeInspectJson } from "../../../utils/inspect";
import { makeReadOnly } from "../../../immutable";

import { validateOrThrow } from "../../json-schema";

import { ThingProperty, ThingPropertyDef } from "../types";

// TODO: Support object properties.  Currently only supports scalers
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

  get type(): DataSchemaType {
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

  setValue(value: any): Promise<void> {
    const schema: JSONSchema6 = {
      type: this._def.type,
      enum: this._def.enum,
      minimum: this._def.minimum,
      maximum: this._def.maximum,
    };
    validateOrThrow(value, schema);

    try {
      return this._def.onValueChangeRequested(this._thingId, this._id, value);
    } catch (e) {
      return Promise.reject(e);
    }
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
      "@index": this.id,
      [DCMITermsIris.Title]: this.title,
      [DCMITermsIris.Description]: this.description,
      [W3cRdfSyntaxIris.Type]: {
        "@id": dataSchemaTypeToW3cWotClass(this.type),
      },
      [SchemaOrgIris.UnitCode]: this.unit,
      [W3cWotJsonSchemaIris.Enum]: this.enum ? [...this.enum] : undefined,
      [W3cWotJsonSchemaIris.Minimum]: this.minimum,
      [W3cWotJsonSchemaIris.Maximum]: this.maximum,
      [W3cWotJsonSchemaIris.ReadOnly]: this.readOnly,
    };
  }
}
