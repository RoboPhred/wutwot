export type ThingPropertyType =
  | "null"
  | "object"
  | "array"
  | "number"
  | "integer"
  | "string"
  | "boolean";

export interface ThingProperty {
  readonly ownerPlugin: object;

  readonly id: string;
  readonly thingId: string;

  readonly title: string;
  readonly semanticType: string | undefined;
  readonly description: string;
  readonly type: ThingPropertyType;
  readonly unit: string | undefined;
  readonly enum: string[] | undefined;
  readonly minimum: number | undefined;
  readonly maximum: number | undefined;
  readonly multipleOf: number | undefined;
  readonly readOnly: boolean;

  readonly value: any;

  setValue(value: any): void;
}
