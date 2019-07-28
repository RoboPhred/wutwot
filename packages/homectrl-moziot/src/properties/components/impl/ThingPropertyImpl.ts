import { ThingProperty, ThingPropertyDef } from "../../types";

export class ThingPropertyImpl implements ThingProperty {
  constructor(private _def: ThingPropertyDef, private _id: string) {
    this._def = { ..._def };
  }

  get id(): string {
    return this._id;
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

  get type(): "string" | "number" | "object" | "null" | "array" | "integer" {
    return this._def.type;
  }

  get unit(): string {
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
    return;
  }

  setValue(value: any): void {
    throw new Error("Method not implemented.");
  }
}
