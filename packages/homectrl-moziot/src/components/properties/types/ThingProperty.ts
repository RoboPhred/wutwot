import { ToJSON } from "../../../types";

export interface ThingProperty {
  readonly id: string;
  readonly thingId: string;

  readonly ownerPlugin: object;

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

  toJSON(): ToJSON<ThingProperty>;
}

export type ThingPropertyType =
  | "null"
  | "object"
  | "array"
  | "number"
  | "integer"
  | "string"
  | "boolean";

export const ThingPropertyTypes: ThingPropertyType[] = [
  "null",
  "object",
  "array",
  "number",
  "integer",
  "string",
  "boolean"
];
