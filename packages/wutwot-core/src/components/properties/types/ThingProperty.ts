import { ToJSON, JSONAble } from "../../../types";

import { InteractionAffordance } from "../../affordance";
import { JSONLDAble } from "../../json-ld";

// TODO: According to the specs, this inherits from DataSchema.
//  However, DataSchema is multiple types combined, so we need to implement each one.
// Maybe we should provide multiple ThingProperty interfaces based on the core type?
export interface ThingProperty
  extends InteractionAffordance,
    JSONAble<ToJSON<ThingProperty>>,
    JSONLDAble {
  /**
   * The data type of this property.
   */
  readonly type: ThingPropertyType;

  /**
   * The unit of the property value.
   */
  readonly unit: string | undefined;

  /**
   * Allowed values.
   */
  readonly enum: string[] | undefined;

  /**
   * The minimum value, if type is numeric.
   */
  readonly minimum: number | undefined;

  /**
   * The maximum value, if type is numeric.
   */
  readonly maximum: number | undefined;

  /**
   * If specified and type is numeric, value must be a multiple of this number.
   */
  readonly multipleOf: number | undefined;

  /**
   * Whether the property is read ondly.
   */
  readonly readOnly: boolean;

  // TODO: writeOnly

  /**
   * The value of this property.
   */
  readonly value: any;

  /**
   * Writes a new value to this property.
   * @param value The value to write.
   */
  setValue(value: any): void;

  /**
   * Gets a JSON representation of this property.
   */
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
