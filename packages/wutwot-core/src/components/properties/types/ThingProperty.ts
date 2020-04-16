import { ToJSON } from "../../../types";
import { InteractionAffoardance } from "../../affoardance";

// TODO: According to the specs, this inherits from DataSchema.
//  However, DataSchema is multiple types combined, so we need to implement each one.
// Maybe we should provide multiple ThingProperty interfaces based on the core type?
export interface ThingProperty extends InteractionAffoardance {
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
  "boolean",
];