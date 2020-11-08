import { DataSchemaType } from "@wutwot/td";

import { ToJSON } from "../../../types";

import { InteractionAffordance } from "../../affordance";
import { JSONLDAble } from "../../json-ld";

// TODO: According to the specs, this inherits from DataSchema.
//  However, DataSchema is multiple types combined, so we need to implement each one.
// Maybe we should provide multiple ThingProperty interfaces based on the core type?
export interface ThingProperty extends InteractionAffordance, JSONLDAble {
  /**
   * The data type of this property.
   */
  readonly type: DataSchemaType;

  /**
   * The unit of the property value.
   */
  readonly unit: string | undefined;

  /**
   * Allowed values.
   */
  readonly enum: any[] | undefined;

  /**
   * The minimum value, if type is numeric.
   */
  readonly minimum: number | undefined;

  /**
   * The maximum value, if type is numeric.
   */
  readonly maximum: number | undefined;

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
  setValue(value: any): Promise<void>;

  /**
   * Gets a JSON representation of this property.
   */
  toJSON(): ToJSON<ThingProperty>;
}
