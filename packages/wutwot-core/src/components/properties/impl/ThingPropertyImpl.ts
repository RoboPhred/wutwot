import { JSONSchema6, JSONSchema6Type } from "json-schema";
import { inspect } from "util";
import { cloneDeep } from "lodash";
import {
  DCMITermsIRIs,
  W3cRdfSyntaxIRIs,
  DataSchemaType,
  W3cWotJsonSchemaIRIs,
  SchemaOrgIRIs,
  dataSchemaTypeToW3cWotClass,
  W3cWotTDContext,
  W3cWotTdIRIs,
} from "@wutwot/td";

import { makeInspectJson } from "../../../utils/inspect";
import {
  DeepImmutableObject,
  makeReadOnly,
  makeReadOnlyDeep,
} from "../../../immutable";

import { validateOrThrow } from "../../json-schema";

import { ThingProperty, ThingPropertyDef } from "../types";

// TODO: Support object properties.  Currently only supports scalers
export class ThingPropertyImpl implements ThingProperty {
  private _lastValue: any;
  private _def: DeepImmutableObject<ThingPropertyDef>;

  constructor(
    def: ThingPropertyDef,
    private _id: string,
    private _thingId: string,
    private _owner: object,
  ) {
    this._def = {
      ...makeReadOnlyDeep(cloneDeep(def)),
      // Do not mess with the values observable.  There is no point freezing it
      // as its entire purpose is to give us live values, and the cloning process
      // will break the observable.
      values: def.values,
    };

    this._lastValue = this._def.initialValue;
    this._def.values.subscribe({
      next: (value: any) => {
        // TODO: Raise event
        this._lastValue = value;
      },
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

  get enum(): readonly string[] | undefined {
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

  get minLength(): number | undefined {
    return this._def.minLength;
  }

  get maxLength(): number | undefined {
    return this._def.maxLength;
  }

  /**
   * The pattern the value must match, if type is string.
   */
  get pattern(): string | undefined {
    return this._def.pattern;
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
      enum: this._def.enum as JSONSchema6Type[],
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
      multipleOf: this.multipleOf,
      minLength: this.minLength,
      maxLength: this.maxLength,
      pattern: this.pattern,
      readOnly: this.readOnly,
      value: this.value,
    };
  }

  toJSONLD() {
    return {
      [W3cWotTdIRIs.Name]: this.id,
      "@type": this.semanticTypes,
      [DCMITermsIRIs.Title]: this.title,
      [DCMITermsIRIs.Description]: this.description,
      [W3cRdfSyntaxIRIs.Type]: {
        "@id": dataSchemaTypeToW3cWotClass(this.type),
      },
      [SchemaOrgIRIs.UnitCode]: this.unit,
      [W3cWotJsonSchemaIRIs.Enum]: this.enum ? [...this.enum] : undefined,
      [W3cWotJsonSchemaIRIs.Minimum]: this.minimum,
      [W3cWotJsonSchemaIRIs.Maximum]: this.maximum,
      [W3cWotJsonSchemaIRIs.MinLength]: this.minLength,
      [W3cWotJsonSchemaIRIs.MaxLength]: this.maxLength,
      [W3cWotJsonSchemaIRIs.Pattern]: this.pattern,
      [W3cWotJsonSchemaIRIs.ReadOnly]: this.readOnly,
    };
  }
}
