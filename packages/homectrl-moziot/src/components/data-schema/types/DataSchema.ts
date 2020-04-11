import { JSONSchema6 } from "json-schema";
import { makeReadOnly } from "../../../utils/readonly";

import { makeValidator, makeValidateOrThrow } from "../../json-schema";

export type DataSchemaType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "null";
export const DataSchemaTypes: Readonly<DataSchemaType[]> = makeReadOnly([
  "object",
  "array",
  "string",
  "number",
  "integer",
  "boolean",
  "null",
]);

export interface DataSchemaBase {
  /**
   * JSON-LD keyword to label the object with semantic tags (or types)
   */
  "@type"?: string | string[];

  /**
   * Provides a human-readable title (e.g., display a text for UI representation) based on a default language.
   */
  title?: string;

  // titles: MultiLanguage

  /**
   * 	Provides additional (human-readable) information based on a default language.
   */
  description?: string;

  // descriptions: MultiLanguage

  /**
   * 	Assignment of JSON-based data types compatible with JSON Schema (one of boolean, integer, number, string, object, array, or null).
   */
  type?: DataSchemaType;

  /**
   * Provides a constant value.
   */
  const?: any;

  /**
   * Provides unit information that is used, e.g., in international science, engineering, and business.
   */
  unit?: string;

  /**
   * Used to ensure that the data is valid against one of the specified schemas in the array.
   */
  oneOf?: DataSchema[];

  /**
   * Restricted set of values provided as an array.
   */
  enum?: any[];

  /**
   * Boolean value that is a hint to indicate whether a property interaction / value is read only (=true) or not (=false).
   */
  readOnly?: boolean;

  /**
   * Boolean value that is a hint to indicate whether a property interaction / value is write only (=true) or not (=false).
   */
  writeOnly?: boolean;

  /**
   * Allows validation based on a format pattern such as "date-time", "email", "uri", etc.
   */
  format?: string;
}

export interface ArraySchema extends DataSchemaBase {
  type: "array";

  /**
   * Used to define the characteristics of an array.
   */
  items?: DataSchema | DataSchema[];

  /**
   * Defines the minimum number of items that have to be in the array.
   */
  minItems?: number;

  /**
   * 	Defines the maximum number of items that have to be in the array.
   */
  maxItems?: number;
}

export interface BooleanSchema extends DataSchemaBase {
  type: "boolean";
}

export interface NumberSchema extends DataSchemaBase {
  type: "number";

  /**
   * 	Specifies a minimum numeric value. Only applicable for associated number or integer types.
   */
  minimum?: number;

  /**
   * Specifies a maximum numeric value. Only applicable for associated number or integer types.
   */
  maximum?: number;
}

export interface IntegerSchema extends DataSchemaBase {
  type: "integer";

  /**
   * 	Specifies a minimum numeric value. Only applicable for associated number or integer types.
   */
  minimum?: number;

  /**
   * Specifies a maximum numeric value. Only applicable for associated number or integer types.
   */
  maximum?: number;
}

export interface ObjectSchema extends DataSchemaBase {
  type: "object";

  /**
   * Data schema nested definitions.
   */
  properties?: Record<string, DataSchema>;

  /**
   * Defines which members of the object type are mandatory.
   */
  required?: string[];
}

export interface StringSchema extends DataSchemaBase {
  type: "string";
}

export interface NullSchema extends DataSchemaBase {
  type: "null";
}

/**
 * Defines a data schema used commonly among WOT concerns.
 *
 * Data schemas describe both data primitives and structures.
 *
 * In general, DataSchemas follow JSON Schema standards.
 * {@see https://w3c.github.io/wot-thing-description/#sec-data-schema-vocabulary-definition}
 */
export type DataSchema =
  | ArraySchema
  | BooleanSchema
  | NumberSchema
  | IntegerSchema
  | ObjectSchema
  | StringSchema
  | NullSchema;

// TODO: Handle other schema variants
//  Will need to use ids and $ref to handle cyclic schemas.
export const dataSchemaSchema: Readonly<JSONSchema6> = makeReadOnly({
  type: "object",
  properties: {
    "@type": { type: ["string", "array"], items: { type: "string" } },
    title: { type: "string" },
    description: { type: "string" },
    type: { type: "string", enum: DataSchemaTypes as string[] },
    const: { type: "any" },
    unit: { type: "string" },
    oneOf: {
      type: "array",
      // TODO: Self-reference
    },
    enum: { type: "array" },
    readOnly: { type: "boolean" },
    writeOnly: { type: "boolean" },
    format: { type: "string" },
  },
});

export const validateDataSchema = makeValidator(dataSchemaSchema);
export const validateDataSchemaOrThrow = makeValidateOrThrow(
  validateDataSchema,
);
